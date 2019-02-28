package com.kdmt.gxd.easy.book.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kdmt.gxd.easy.book.entities.BookDTO;
import com.kdmt.gxd.easy.util.beanUtil.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import com.kdmt.gxd.easy.book.entities.Book;

import com.kdmt.gxd.easy.book.services.IBookService;


@Controller
@RequestMapping("book")
public class BookController {
    @Resource(name="bookService")
    private IBookService bookService;

//    //用户中心的List子页面
//    @RequestMapping(value = "", method = RequestMethod.GET)
//    public String userList(ModelMap model, HttpSession session, HttpServletRequest request) {
//
//        return "mySystem/bookManage/propose/proposeList";
//    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> bookModel = bookService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(bookModel);
    }
    //中心的List子页面
    @RequestMapping(value = "borrowBook", method = RequestMethod.GET)
    public String bookList(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/book/bookManage";
    }

    //图书上下架
    @RequestMapping(value = "updownBook", method = RequestMethod.GET)
    public String updownBook(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/book/bookUpDownList";
    }
    //用户中心的List子页面
    @RequestMapping(value = "bookList", method = RequestMethod.GET)
    public String userList(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/book/bookList";
    }

    //到用户添加页面
    @RequestMapping(value = "borrow", method = RequestMethod.GET)
    public String borrow(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/book/borrow";
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
