package com.supconit.easy.ticket.book.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;


import com.supconit.easy.ticket.book.entieies.Book;
import com.supconit.easy.ticket.book.entieies.BookDTO;
import com.supconit.easy.ticket.book.services.IBookService;
import com.supconit.easy.ticket.util.util.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;



@Controller
@RequestMapping("book")
public class BookController {
    @Resource(name="bookService")
    private IBookService bookService;

//    @RequestMapping(value = "/list", method = RequestMethod.GET)
//    public ResponseEntity<String> list(
//        @Validated
//        LimitShowDTO limitShowDTO, BindingResult errors) {
//        if(errors.hasErrors())
//            return ResponseUtil.getResponseEntityWhenInvalidReqParams();
//
//        Map<String, Object> result = new HashMap<String, Object>();
//
//        List<Map<String, Object>> bookList = bookService.loadMaps(null, null, null, null, limitShowDTO.getCurPage(), limitShowDTO.getLimit());
//        long count = bookService.count();
//
//        result.put("rows", bookList);
//        result.put("total", count);
//
//        return ResponseUtil.getResEntityForGetAndJson(result);
//    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> bookModel = bookService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(bookModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    BookDTO bookDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        Book bookModel = bookDTO.toModel();

        return ResponseUtil.getResEntityForPPP(bookService.save(bookModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
        @Validated
        BookDTO bookDTO, BindingResult errors) {

        Book bookModel = bookDTO.toModel();
        bookModel.setId(id);
        return ResponseUtil.getResEntityForPPP(bookService.update(bookModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(bookService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(bookService.batchDelete(primaryKeys));
    }
}
