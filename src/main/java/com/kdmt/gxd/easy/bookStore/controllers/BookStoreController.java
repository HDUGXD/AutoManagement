package com.kdmt.gxd.easy.bookStore.controllers;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.alibaba.fastjson.JSONObject;
import com.kdmt.gxd.easy.book.entities.Book;
import com.kdmt.gxd.easy.book.entities.BookDTO;
import com.kdmt.gxd.easy.bookStore.entities.BookStoreDTO;
import com.kdmt.gxd.easy.user.entities.HoUser;
import com.kdmt.gxd.easy.util.beanUtil.ResponseUtil;
import com.kdmt.gxd.easy.util.cxf.StaticElement;
import com.kdmt.gxd.easy.util.pager.PageInfo;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.kdmt.gxd.easy.bookStore.services.IBookStoreService;
import com.kdmt.gxd.easy.bookStore.entities.BookStore;


@Controller
@RequestMapping("bookStore")
public class BookStoreController {
    @Resource(name="bookStoreService")
    private IBookStoreService bookStoreService;

    //用户中心的List子页面
    @RequestMapping(value = "bookStoreList", method = RequestMethod.GET)
    public String userList(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/bookStore/bookStoreList";
    }
    //到用户添加页面
    @RequestMapping(value = "addBook", method = RequestMethod.GET)
    public String addUser(ModelMap model, HttpSession session, HttpServletRequest request) {

        return "mySystem/bookManage/bookStore/addBook";
    }
    @ResponseBody
    @RequestMapping(value = "addBook")
    public HashMap<String, Object> addBook(@RequestParam(required = true) String jsonStr){
        BookStore bookStore = JSONObject.parseObject(jsonStr,BookStore.class);
        //图片路径
        String toDir="D://bookface_img/";
        File toFile = new File(toDir);
        StaticElement.createDir(toFile,toDir);
        //完整路径
        String src="D://bookface_img/"+bookStore.getImgName();
//        //base64转存图片
        String pic_base64=bookStore.getBookPicUrl();
        String base64=pic_base64.substring(pic_base64.lastIndexOf(",")+1,pic_base64.length());
//        //存图片
        StaticElement.Base64ToImage(base64,src);
////入库
        bookStore.setBookPicUrl(src);


        bookStoreService.save(bookStore);

        return null;
    }

    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： 详情
     */
    @RequestMapping(value = "view", method = RequestMethod.GET)
    public String view(String id, String row, HttpSession session, HttpServletRequest request, ModelMap model) {
BookStore bookStore = bookStoreService.findModel(Long.parseLong(id));
        //        Bayonet bayonet = bayonetService.findModel(Long.parseLong(id));
//        //转换时间格式为   yyyy-MM-dd HH:mm:ss
////        bayonet.setJgsjCn(DateUtil.format(bayonet.getJgsj()));
//        bayonet.setFirstPicPath(bayonet.getFirstPicPath().replace("/mnt/data",""));
//        bayonet.setSecondPicPath(bayonet.getSecondPicPath().replace("/mnt/data",""));
//
//        model.put("bayonet",bayonet);
//
//        model.put("row",row);

        //图片名称
        String url= bookStore.getBookPicUrl();
        bookStore.setBookPicUrl("/bookface_img/"+url.substring(url.lastIndexOf("/")+1,url.length()));


        model.put("entity",bookStore);
        model.put("row",row);


        return "mySystem/bookManage/bookStore/view";
    }

    @ResponseBody      //返回数据实体  要用此标签
    @RequestMapping(value = "getAllByCondition", method = RequestMethod.POST)
    public List<BookStore> finAllByCondition(@Validated BookStore hoUserDTO, BindingResult errors) {

//        BookStore hoUserModel = hoUserDTO.toModel();
        List<BookStore> userList= bookStoreService.findAllByCondition(hoUserDTO);
        return userList;
    }
//    //分页
//    @ResponseBody
//    @RequestMapping(value = "findPager", method = RequestMethod.POST)
//    public PageInfo list(int pageSize, int pageNo,HoUser condition,ModelMap model) {
//        //总共条数
//        long count = hoUserService.count();
//        //条件查询 分页   封装传条件
//
//        //查询
//        List<HoUser> pagerList= hoUserService.findByPage(pageNo*pageSize,pageSize);
//        //封装返回
//        PageInfo  pageInfo = new PageInfo();
//        pageInfo.setRows(pagerList);
//        pageInfo.setTotalCount((int)count);
//        //每页 首行序号
//        pageInfo.setStartRow(pageNo*pageSize+1);
//
//        return pageInfo;
//    }

    //分页
    @ResponseBody
    @RequestMapping(value = "findPager", method = RequestMethod.POST)
    public PageInfo list(BookStore condition, ModelMap model) {
        //总共条数
//        long count = hoUserService.count();
        //避免 “” 空字符串
        if("".equals(condition.getBookName())){
            condition.setBookName(null);
        }

        int count = bookStoreService.findAllByCondition(condition).size();
        //条件查询 分页   封装传条件
        condition.setPageSize(condition.getPageSize());
        condition.setPageNo(condition.getPageNo()*condition.getPageSize());
        //查询
        List<BookStore> pagerList= bookStoreService.findByPage(condition);
        //封装返回
        PageInfo  pageInfo = new PageInfo();
        pageInfo.setRows(pagerList);
        pageInfo.setTotalCount(count);
        //每页 首行序号
        pageInfo.setStartRow(condition.getPageNo()+1);

        return pageInfo;
    }
    @ResponseBody
    @RequestMapping(value = "getCount", method = RequestMethod.POST)
    public long getCount(HttpSession session, HttpServletRequest request) {
        long listCount=bookStoreService.getCount();
        return listCount;
    }
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> bookStoreModel = bookStoreService.findMap(id);

        return ResponseUtil.getResEntityForGetAndJson(bookStoreModel);
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<String> create(
            @Validated
                    BookStoreDTO bookStoreDTO, BindingResult errors) {
        if(errors.hasErrors())
            return ResponseUtil.getResponseEntityWhenInvalidReqParams();

        BookStore bookStoreModel = bookStoreDTO.toModel();

        return ResponseUtil.getResEntityForPPP(bookStoreService.save(bookStoreModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
        @Validated
        BookStoreDTO bookStoreDTO, BindingResult errors) {

        BookStore bookStoreModel = bookStoreDTO.toModel();
        bookStoreModel.setId(id);
        return ResponseUtil.getResEntityForPPP(bookStoreService.update(bookStoreModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(bookStoreService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(bookStoreService.batchDelete(primaryKeys));
    }
}
