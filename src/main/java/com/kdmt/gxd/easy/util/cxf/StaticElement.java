package com.kdmt.gxd.easy.util.cxf;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import javax.activation.DataHandler;

import com.alibaba.fastjson.JSONObject;
import com.kdmt.gxd.easy.bayonet.entities.Bayonet;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;



public class StaticElement {
	
	
	public static String getDadahandlarToBase64(DataHandler handlar) throws Exception{
		byte[] buffer = new byte[handlar.getInputStream().available()];
		 BASE64Encoder encoder = new BASE64Encoder();
		return buffer != null ? encoder.encode(buffer) : "";
	}
	
	public static String getPicId(){
		 Calendar now = Calendar.getInstance();
	      String year = now.get(Calendar.YEAR)+"";
	      String month = addZero(now.get(Calendar.MONTH)+1+"");
	      String day = addZero(now.get(Calendar.DAY_OF_MONTH)+"");
	      String hour = addZero(now.get(Calendar.HOUR_OF_DAY)+"");
	      String min = addZero(now.get(Calendar.MINUTE)+"");
	      String sec = addZero(now.get(Calendar.SECOND)+"");
	      String mill = now.getTimeInMillis()+"";
	      String millStr = mill.substring(mill.length()-5,mill.length());
	      String picId = "33030000001320000003_"+year+month+day+hour+min+sec+"_"+millStr;
	      return picId;
	}

	
	public static String addZero(String a){
		return a.length()==1?"0"+a:a;
	}
   //数据库连接
	public static void Base64ToImage(String imgStr,String imgFilePath) { // 对字节数组字符串进行Base64解码并生成图片
		 
		if(imgStr!=""&&imgStr!=null){
			BASE64Decoder decoder = new BASE64Decoder();
			try {
				// Base64解码
				byte[] b = decoder.decodeBuffer(imgStr);
				for (int i = 0; i < b.length; ++i) {
					if (b[i] < 0) {// 调整异常数据
						b[i] += 256;
					}
				}
			
		            String command = "chmod 777 " + imgFilePath;
		            try {
		            	 Process process = Runtime.getRuntime().exec(command);
		                 process.waitFor();
		                 int existValue = process.exitValue();
					} catch (Exception e) {
						System.out.println("授权问题");
					}
		            
		            
				OutputStream out = new FileOutputStream(imgFilePath);
				out.write(b);
				out.flush();
				
		            try {
		            	 Process process = Runtime.getRuntime().exec(command);
		                 process.waitFor();
		                 int existValue = process.exitValue();
					} catch (Exception e) {
						System.out.println("授权问题");
					}
				out.close();
	 
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
 
	
 
	}
	public static Date changePasstime(String passtime)   {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		if(passtime==null||passtime==""){
			return new Date();
		}else{
			String time = passtime.substring(0, 4)+"-"+passtime.substring(4, 6)+"-"+passtime.substring(6, 8)+" "+passtime.substring(8, 10)+":"+passtime.substring(10, 12)+":"+passtime.substring(12,14); 
	    	
	    	Date  res = null;
	    	try{
	    		res = sdf.parse(time);
	    	}catch(Exception e){
	    		e.printStackTrace();
	    	}
	    	
	    	return res;
		}
		
	}

	/**
	 * 统计字段
	 * @param passtime
	 * @return
	 */
	public static String changePasstimeToYearDay(String passtime)   {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd_HH");
		String str = null;
        if(passtime==null||passtime==""){
	        return sdf.format(new Date()) ;
        }else{
//	       String time = passtime.substring(0, 4)+"-"+passtime.substring(4, 6)+"-"+passtime.substring(6, 8)+" "+passtime.substring(8, 10)+":"+passtime.substring(10, 12)+":"+passtime.substring(12,14); 
	try{
		str = passtime.substring(0, 4)+"-"+passtime.substring(4, 6)+"-"+passtime.substring(6, 8)+"_"+passtime.substring(8, 10);
	}catch(Exception e){
		e.printStackTrace();
	}
	
	return str;
}
	}

	/**
	 * 获得毫秒时间挫
	 * @param passtime
	 * @return
	 */
    public static String getPicNameMill(String passtime){
    	String picName=passtime.substring(passtime.length()-8,passtime.length()).replace(".", "_");
    	return picName;
    	}

	/**
	 * 存储文件的文件夹
	 * @param toFile
	 */
	public static  void createDir(File toFile,String toDir){
		if (!toFile.exists()) {
			System.out.println("当前文件夹不存在,创建了文件夹");
			toFile.mkdir();
			toFile.setExecutable(true);
			toFile.setReadable(true);
			toFile.setWritable(true);

			String command = "chmod 777 " + toDir;
			try {
				Process process = Runtime.getRuntime().exec(command);
				process.waitFor();
				int existValue = process.exitValue();
			} catch (Exception e) {
				System.out.println("授权问题");
			}
		}
	}

	/**
	 * 将json转换为bean
	 * @param jsonObject
	 */
	public static Bayonet changeToBean(JSONObject jsonObject){

		long a= new Date().getTime();
		Bayonet bayonet = new Bayonet();
		bayonet.setDeviceId((String) jsonObject.get("deviceId"));
		bayonet.setAgencyId((String) jsonObject.get("agencyId"));
		bayonet.setAgencyKey((String) jsonObject.get("agencyKey"));
		bayonet.setPassportName((String) jsonObject.get("passportName"));
		bayonet.setDirectionName((String) jsonObject.get("directionName"));
		bayonet.setWayId((String) jsonObject.get("wayId"));
		bayonet.setWayName((String) jsonObject.get("wayName"));

		//过车时间
		String passtime=(String) jsonObject.get("passtime");
		Date pt = changePasstime(passtime);
		bayonet.setPasstime(pt);


		bayonet.setPlateNumber((String) jsonObject.get("plateNumber"));
		bayonet.setPlateColor((String) jsonObject.get("plateColor"));
		bayonet.setPlateType((String) jsonObject.get("plateType"));
		bayonet.setCarType((String) jsonObject.get("carType"));
		bayonet.setCarLogo((String) jsonObject.get("carLogo"));
		bayonet.setCarModel((String) jsonObject.get("carModel"));
		bayonet.setCarColor((String) jsonObject.get("carColor"));
		bayonet.setCarLength((String) jsonObject.get("carLength"));
		bayonet.setFirstPicPath((String) jsonObject.get("firstPicPath"));
		bayonet.setSecondPicPath((String) jsonObject.get("secondPicPath"));
		bayonet.setReservePicPath((String) jsonObject.get("reservePicPath"));
		bayonet.setSpeed((String) jsonObject.get("speed"));
		bayonet.setMaxLimitSpeed((String) jsonObject.get("maxLimitSpeed"));
		bayonet.setMinLimitSpeed((String) jsonObject.get("minLimitSpeed"));
		bayonet.setLittleArea((String) jsonObject.get("littleArea"));
		bayonet.setCarNoConfide((String) jsonObject.get("carNoConfide"));
		bayonet.setCarRect((String) jsonObject.get("carRect"));
		bayonet.setBz1((String) jsonObject.get("bz1"));
		bayonet.setBz2((String) jsonObject.get("bz2"));

		//统计时间字段
		String day_hour = changePasstimeToYearDay(passtime);
		String [] timeArr=day_hour.split("_");
		bayonet.setCountDay(timeArr[0]);
		bayonet.setCountHour(timeArr[1]);

		//区域Code 公司Code
        String qy_code =((String) jsonObject.get("agencyId")).substring(0,6);
        String gs_code = ((String) jsonObject.get("agencyId")).substring(6,8);
        bayonet.setQyCode(qy_code);
        bayonet.setGsCode(gs_code);

		System.out.println(new Date().getTime()-a+"***************************************************");

		return bayonet;
	}


}
