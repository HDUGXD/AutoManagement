package com.kdmt.gxd.easy.bayonet.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import com.kdmt.gxd.easy.bayonet.entities.Bayonet;
import com.kdmt.gxd.easy.bayonet.entities.BayonetDTO;
import com.kdmt.gxd.easy.bayonet.services.IBayonetService;
import com.kdmt.gxd.easy.user.services.IHoUserService;
import com.kdmt.gxd.easy.util.pager.PageInfo;
import com.kdmt.gxd.easy.util.util.DateUtil;
import com.kdmt.gxd.easy.util.util.ResponseUtil;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;



@Controller
@RequestMapping("bayonet")
public class BayonetController {
    @Resource(name = "bayonetService")
    private IBayonetService bayonetService;
    @Resource(name = "hoUserService")
    private IHoUserService hoUserService;
    @Resource(name = "redisTemplate")
    private RedisTemplate redisTemplate;


    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： 数据概览
     */
    @RequestMapping(value = "dataShow", method = RequestMethod.GET)
    public String dataShow(ModelMap model, HttpSession session, HttpServletRequest request) {
        //所有的车辆
        long count = bayonetService.count();
        //当天车辆


        model.put("allNum",count);
        return "system/echarts/dataShow";
    }

    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： vehicleMonitor 车辆监控
     */
    @RequestMapping(value = "vehicleMonitor", method = RequestMethod.GET)
    public String vehicleMonitor(ModelMap model, HttpSession session, HttpServletRequest request) {
//        Datadictionaryitem  condition = new Datadictionaryitem();
//        condition.setDictionaryCode(InitalData.CLLX);
//        List <Datadictionaryitem> cllxList = datadictionaryitemService.findAllByCondition(condition);
//        model.put("cllxList",cllxList);
        return "system/home/carList";
    }
    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe：  vehicleIllegal 违法车辆
     */
    @RequestMapping(value = "vehicleIllegal", method = RequestMethod.GET)
    public String vehicleIllegal(ModelMap model, HttpSession session, HttpServletRequest request) {
//        Datadictionaryitem  condition = new Datadictionaryitem();
//        condition.setDictionaryCode(InitalData.CLLX);
//        List <Datadictionaryitem> cllxList = datadictionaryitemService.findAllByCondition(condition);
//        model.put("cllxList",cllxList);
        return "system/home/illegalCarList";
    }
    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： 数据展示     车牌颜色
     */
    @ResponseBody
    @RequestMapping(value = "echarts_2", method = RequestMethod.POST)
    public List<Bayonet> echarts_2(String date, ModelMap model) {
        Bayonet condition = new Bayonet();
        condition.setCountDay(date);
        List<Bayonet> bayonetList = bayonetService.getEcharts_2(condition);
        for(int i=0;i<bayonetList.size();i++){
            bayonetList.get(i).setPlateColor((String) redisTemplate.opsForValue().get("HPYS:"+bayonetList.get(i).getPlateColor()));
        }
        return bayonetList;
    }
    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： 数据展示
     */
    @ResponseBody
    @RequestMapping(value = "echarts_1", method = RequestMethod.POST)
    public List<Bayonet> echarts_1(String date,ModelMap model) {
        Bayonet condition = new Bayonet();
        condition.setCountDay(date);
        List<Bayonet> bayonetList = bayonetService.getEcharts_1(condition);

        return bayonetList;
    }
    @ResponseBody
    @RequestMapping(value = "echarts_3", method = RequestMethod.POST)
    public List<Bayonet> echarts_3(String date,ModelMap model) {
        int totalNum=0;
        int high=0;
        Bayonet condition = new Bayonet();
        condition.setCountDay(date);
        List<Bayonet> bayonetList = bayonetService.getEcharts_3(condition);


        return bayonetList;
    }
    @ResponseBody
    @RequestMapping(value = "getDaysNum", method = RequestMethod.POST)
    public Map<String,String> getDaysNum(String date,ModelMap model) {
        Map<String,String> map = new HashMap<>();
        Bayonet condition = new Bayonet();
        condition.setCountDay(date);
        List<Bayonet> bayonetList = bayonetService.getEcharts_3(condition);
        int heigh = 0;
        int all=0;
        for(int i=0;i<bayonetList.size();i++){
           all+= bayonetList.get(i).getId();
           map.put(bayonetList.get(i).getCountHour(),bayonetList.get(i).getId().toString());
        }
        map.put("all",String.valueOf(all));
        if(map.get("08")==null){
            map.put("height","0");
        }else{
            map.put("height",map.get("08"));
        }

        return map;
    }

    /**
     * 车辆类型
     * @param date
     * @param model
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "echarts_4", method = RequestMethod.POST)
    public List<Bayonet> echarts_4(String date,ModelMap model) {
        //车辆类型

        Bayonet condition = new Bayonet();
        condition.setCountDay(date);
        List<Bayonet> bayonetList = bayonetService.getEcharts_4(condition);

        for(int i=0;i<bayonetList.size();i++){
            bayonetList.get(i).setQyCode((String) redisTemplate.opsForValue().get("XZQY:"+bayonetList.get(i).getQyCode()));
        }
        return bayonetList;

    }

    @ResponseBody
    @RequestMapping(value = "echarts_5", method = RequestMethod.POST)
    public List<Bayonet> echarts_5(String date,ModelMap model) {
        Bayonet condition = new Bayonet();
        condition.setCountDay(date);

        //用户数据
        List<Bayonet> bayonetList = bayonetService.getEcharts_5(condition);
        return bayonetList;
    }
    @ResponseBody
    @RequestMapping(value = "echarts_6", method = RequestMethod.POST)
    public List<Bayonet> echarts_6(String date, ModelMap model) {
        Bayonet condition = new Bayonet();
        condition.setCountDay(date);
        List<Bayonet> bayonetList = bayonetService.getEcharts_6(condition);
        for(int i=0;i<bayonetList.size();i++){
            bayonetList.get(i).setGsCode((String) redisTemplate.opsForValue().get("GSJG:"+bayonetList.get(i).getGsCode()));
        }
        return bayonetList;

    }


    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<String> show(@PathVariable("id") Long id) {
        Map<String, Object> bayonetModel = bayonetService.findMap(id);
        return ResponseUtil.getResEntityForGetAndJson(bayonetModel);
    }
    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： 分页
     */
    @ResponseBody
    @RequestMapping(value = "findPager", method = RequestMethod.POST)
    public PageInfo list(Bayonet condition, ModelMap model) {

        int count = bayonetService.findAllByCondition(condition).size();

        //条件查询 分页   封装传条件
        condition.setPageSize(condition.getPageSize());
        condition.setPageNo(condition.getPageNo()*condition.getPageSize());
        //查询
        List<Bayonet> pagerList= bayonetService.findByPage(condition);
        for(Bayonet b:pagerList){
            b.setFirstPicPath(b.getFirstPicPath().replace("/mnt/data",""));
            b.setSecondPicPath(b.getSecondPicPath().replace("/mnt/data",""));
            b.setJgsjCn(DateUtil.format(b.getPasstime()));
            //xzqy

        }
        //封装返回
        PageInfo  pageInfo = new PageInfo();
        pageInfo.setRows(pagerList);
        pageInfo.setTotalCount(count);
        //每页 首行序号
        pageInfo.setStartRow(condition.getPageNo()+1);

        return pageInfo;
    }
    /**
     * @author guoxiaodong@163.com
     * @date 2018-06-12 17:25:12
     * describe： 详情
     */
    @RequestMapping(value = "view", method = RequestMethod.GET)
    public String view(String id,String row, HttpSession session, HttpServletRequest request,ModelMap model) {
        Bayonet bayonet = bayonetService.findModel(Long.parseLong(id));
        //转换时间格式为   yyyy-MM-dd HH:mm:ss
//        bayonet.setJgsjCn(DateUtil.format(bayonet.getJgsj()));
        bayonet.setFirstPicPath(bayonet.getFirstPicPath().replace("/mnt/data",""));
        bayonet.setSecondPicPath(bayonet.getSecondPicPath().replace("/mnt/data",""));

        model.put("bayonet",bayonet);

        model.put("row",row);
        return "system/home/view";
    }
    /**
     * @param id
     * @param bayonetDTO
     * @param errors
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> update(@PathVariable("id") Long id,
                                         @Validated
                                                 BayonetDTO bayonetDTO, BindingResult errors) {

        Bayonet bayonetModel = bayonetDTO.toModel();
        bayonetModel.setId(id);
        return ResponseUtil.getResEntityForPPP(bayonetService.update(bayonetModel));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> destory(@PathVariable("id") Long id) {
        return ResponseUtil.getResEntityForDel(bayonetService.delete(id));
    }

    @RequestMapping(value = "/deletes", method = RequestMethod.DELETE)
    public ResponseEntity<String> deletes(@RequestParam("primaryKeys") Long[] primaryKeys) {
        return ResponseUtil.getResEntityForDel(bayonetService.batchDelete(primaryKeys));
    }
}
