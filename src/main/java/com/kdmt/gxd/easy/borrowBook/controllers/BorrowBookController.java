package com.kdmt.gxd.easy.borrowBook.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.borrowBook.entities.BorrowBookDTO;
import com.kdmt.gxd.easy.util.beanUtil.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.kdmt.gxd.easy.borrowBook.entities.BorrowBook;
import com.kdmt.gxd.easy.borrowBook.services.IBorrowBookService;



@Controller
@RequestMapping("borrowBook")
public class BorrowBookController {
    @Resource(name="borrowBookService")
    private IBorrowBookService borrowBookService;


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> borrowBookModel = borrowBookService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(borrowBookModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    BorrowBookDTO borrowBookDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        BorrowBook borrowBookModel = borrowBookDTO.toModel();

        return ResponseUtil.getResEntityForPPP(borrowBookService.save(borrowBookModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
        @Validated
        BorrowBookDTO borrowBookDTO, BindingResult errors) {

        BorrowBook borrowBookModel = borrowBookDTO.toModel();
        borrowBookModel.setId(id);
        return ResponseUtil.getResEntityForPPP(borrowBookService.update(borrowBookModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(borrowBookService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(borrowBookService.batchDelete(primaryKeys));
    }
}
