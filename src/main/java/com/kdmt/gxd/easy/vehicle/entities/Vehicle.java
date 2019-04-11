package com.kdmt.gxd.easy.vehicle.entities;

import java.util.Date;
import java.io.Serializable;


public class Vehicle implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private String id;
        /**对车后盖的描述*/
        private String vehicleTrunk;
        /**对车轮的描述*/
        private String vehicleWheel;
        /**整个号牌号码的识别可信度，以0～100数值表示百分比，数值越大可信度越高*/
        private String plateReliability;
        /**对车窗的描述*/
        private String vehicleWindow;
        /**卡口事件有效，过车时间*/
        private Date passTime;
        /**人工采集时有效*/
        private String markTime;
        /**指号牌底色，取ColorType中部分值： 黑色，白色，黄色，蓝色，绿色*/
        private String plateColor;
        
        private String hasPlate;
        /**卡口相机所拍照片，自动采集必选，图像访问路径，采用URI命名规则*/
        private String storageUrl1;
        
        private String storageUrl2;
        /**人工采集时有效*/
        private String appearTime;
        /**全景相机所拍照片*/
        private String storageUrl3;
        
        private String drivingStatusCode;
        
        private String isModified;
        
        private String vehicleColorDepth;
        /**车辆行驶方向最左车道为1，由左向右顺序编号*/
        private String laneNo;
        /**车辆全局唯一标识*/
        private String motorVehicleid;
        
        private String vehicleHeight;
        
        private String usingPropertiesCode;
        
        private String filmColor;
        /**对车底盘的描述*/
        private String vehicleChassis;
        /**车辆品牌标志可信度；以0～100之间数值表示百分比，数值越大可信度越高*/
        private String brandReliability;
        
        private String isCovered;
        
        private String isAltered;
        
        private String vehicleStyles;
        /**车的轮廓外接矩形在画面中的位置，记录左上角坐标及右下角坐标，自动采集记录时为必选*/
        private String leftTopY;
        /**车的轮廓外接矩形在画面中的位置，记录左上角坐标及右下角坐标，自动采集记录时为必选*/
        private String leftTopX;
        /**号牌号码的识别可信度，以0～100数值表示百分比，数值越大可信度越高。*/
        private String plateCharReliability;
        /**对后视镜的描述*/
        private String rearviewMirror;
        /**当有多个时可用英文半角逗号分隔*/
        private String vehicleRearItem;
        
        private String wheelPrintedPattern;
        /**对车顶的描述*/
        private String vehicleRoof;
        /**各类机动车挂车号牌编号*/
        private String plateNoAttach;
        /**可以包含0个或者多个子图像对象*/
        private String subImageList;
        
        private String eventSort;
        
        private String title;
        
        private String type;
        
        private String deviceid;
        
        private String securityLevel;
        
        private String contentDescription;
        
        private String fileFormat;
        /**车牌框广告信息，包括车行名称，联系电话*/
        private String plateDescribe;
        /**卡口编码*/
        private String tollgateid;
        /**对车侧面的描述，不包括门*/
        private String sideOfVehicle;
        
        private String isSuspicious;
        /**当有多个时可用英文半角逗号分隔*/
        private String vehicleFrontItem;
        /**人工采集时有效*/
        private String disappearTime;
        /**车辆被标注时经过的道路名称*/
        private String nameOfPassedRoad;
        /**0：未系；1：有系*/
        private String safetyBelt;
        /**单位千米每小时（km/h）*/
        private String speed;
        /**对车前部物品数量、颜色、种类等信息的描述*/
        private String descOfFrontItem;
        /**被标注车辆的品牌*/
        private String vehicleBrand;
        /**对车遮挡物的描述*/
        private String vehicleShielding;
        /**车辆内人员数量*/
        private String numOfPassenger;
        /**对车后部物品数量、颜色、种类等信息的描述*/
        private String descOfRearItem;
        
        private String vehicleClass;
        
        private String vehicleModel;
        
        private String isDecked;
        
        private String hitMarkInfo;
        
        private String direction;
        /**对车厢的描述*/
        private String carOfVehicle;
        /**来源图像信息标识*/
        private String sourceid;
        
        private String vehicleColor;
        
        private String plateClass;
        /**各类机动车号牌编号车牌全部无法识别的以“无车牌”标识，部分未识别的每个字符以半角‘-’代替*/
        private String plateNo;
        /**人脸区域，自动采集记录时为必选*/
        private String rightBtmX;
        /**描述车身上的文字信息，或者车上载物信息*/
        private String vehicleBodyDesc;
        /**对车门的描述*/
        private String vehicleDoor;
        /**人脸区域，自动采集记录时为必选*/
        private String rightBtmY;
        
        private String storageUrl4;
        
        private String storageUrl5;
        /**0：收起；1：放下*/
        private String sunvisor;
        
        private String vehicleLength;
        
        private String vehicleWidth;
        /**人工采集还是自动采集*/
        private String infoKind;
        /**0：未打电话；1：打电话中*/
        private String calling;
        /**对车前盖的描述*/
        private String vehicleHood;
        
        private String pageNo;
        
        private String pageSize;
        
        private String countDay;
        
        private String countHour;
        
        private String countMonth;
        
        private String qyCode;
        
        private String gsCode;
        
        public String getId() {
            return this.id;
        }
        
        public void setId(String id) {
            this.id = id;
        }
        
        public String getVehicleTrunk() {
            return this.vehicleTrunk;
        }
        
        public void setVehicleTrunk(String vehicleTrunk) {
            this.vehicleTrunk = vehicleTrunk;
        }
        
        public String getVehicleWheel() {
            return this.vehicleWheel;
        }
        
        public void setVehicleWheel(String vehicleWheel) {
            this.vehicleWheel = vehicleWheel;
        }
        
        public String getPlateReliability() {
            return this.plateReliability;
        }
        
        public void setPlateReliability(String plateReliability) {
            this.plateReliability = plateReliability;
        }
        
        public String getVehicleWindow() {
            return this.vehicleWindow;
        }
        
        public void setVehicleWindow(String vehicleWindow) {
            this.vehicleWindow = vehicleWindow;
        }
        
        public Date getPassTime() {
            return this.passTime;
        }
        
        public void setPassTime(Date passTime) {
            this.passTime = passTime;
        }
        
        public String getMarkTime() {
            return this.markTime;
        }
        
        public void setMarkTime(String markTime) {
            this.markTime = markTime;
        }
        
        public String getPlateColor() {
            return this.plateColor;
        }
        
        public void setPlateColor(String plateColor) {
            this.plateColor = plateColor;
        }
        
        public String getHasPlate() {
            return this.hasPlate;
        }
        
        public void setHasPlate(String hasPlate) {
            this.hasPlate = hasPlate;
        }
        
        public String getStorageUrl1() {
            return this.storageUrl1;
        }
        
        public void setStorageUrl1(String storageUrl1) {
            this.storageUrl1 = storageUrl1;
        }
        
        public String getStorageUrl2() {
            return this.storageUrl2;
        }
        
        public void setStorageUrl2(String storageUrl2) {
            this.storageUrl2 = storageUrl2;
        }
        
        public String getAppearTime() {
            return this.appearTime;
        }
        
        public void setAppearTime(String appearTime) {
            this.appearTime = appearTime;
        }
        
        public String getStorageUrl3() {
            return this.storageUrl3;
        }
        
        public void setStorageUrl3(String storageUrl3) {
            this.storageUrl3 = storageUrl3;
        }
        
        public String getDrivingStatusCode() {
            return this.drivingStatusCode;
        }
        
        public void setDrivingStatusCode(String drivingStatusCode) {
            this.drivingStatusCode = drivingStatusCode;
        }
        
        public String getIsModified() {
            return this.isModified;
        }
        
        public void setIsModified(String isModified) {
            this.isModified = isModified;
        }
        
        public String getVehicleColorDepth() {
            return this.vehicleColorDepth;
        }
        
        public void setVehicleColorDepth(String vehicleColorDepth) {
            this.vehicleColorDepth = vehicleColorDepth;
        }
        
        public String getLaneNo() {
            return this.laneNo;
        }
        
        public void setLaneNo(String laneNo) {
            this.laneNo = laneNo;
        }
        
        public String getMotorVehicleid() {
            return this.motorVehicleid;
        }
        
        public void setMotorVehicleid(String motorVehicleid) {
            this.motorVehicleid = motorVehicleid;
        }
        
        public String getVehicleHeight() {
            return this.vehicleHeight;
        }
        
        public void setVehicleHeight(String vehicleHeight) {
            this.vehicleHeight = vehicleHeight;
        }
        
        public String getUsingPropertiesCode() {
            return this.usingPropertiesCode;
        }
        
        public void setUsingPropertiesCode(String usingPropertiesCode) {
            this.usingPropertiesCode = usingPropertiesCode;
        }
        
        public String getFilmColor() {
            return this.filmColor;
        }
        
        public void setFilmColor(String filmColor) {
            this.filmColor = filmColor;
        }
        
        public String getVehicleChassis() {
            return this.vehicleChassis;
        }
        
        public void setVehicleChassis(String vehicleChassis) {
            this.vehicleChassis = vehicleChassis;
        }
        
        public String getBrandReliability() {
            return this.brandReliability;
        }
        
        public void setBrandReliability(String brandReliability) {
            this.brandReliability = brandReliability;
        }
        
        public String getIsCovered() {
            return this.isCovered;
        }
        
        public void setIsCovered(String isCovered) {
            this.isCovered = isCovered;
        }
        
        public String getIsAltered() {
            return this.isAltered;
        }
        
        public void setIsAltered(String isAltered) {
            this.isAltered = isAltered;
        }
        
        public String getVehicleStyles() {
            return this.vehicleStyles;
        }
        
        public void setVehicleStyles(String vehicleStyles) {
            this.vehicleStyles = vehicleStyles;
        }
        
        public String getLeftTopY() {
            return this.leftTopY;
        }
        
        public void setLeftTopY(String leftTopY) {
            this.leftTopY = leftTopY;
        }
        
        public String getLeftTopX() {
            return this.leftTopX;
        }
        
        public void setLeftTopX(String leftTopX) {
            this.leftTopX = leftTopX;
        }
        
        public String getPlateCharReliability() {
            return this.plateCharReliability;
        }
        
        public void setPlateCharReliability(String plateCharReliability) {
            this.plateCharReliability = plateCharReliability;
        }
        
        public String getRearviewMirror() {
            return this.rearviewMirror;
        }
        
        public void setRearviewMirror(String rearviewMirror) {
            this.rearviewMirror = rearviewMirror;
        }
        
        public String getVehicleRearItem() {
            return this.vehicleRearItem;
        }
        
        public void setVehicleRearItem(String vehicleRearItem) {
            this.vehicleRearItem = vehicleRearItem;
        }
        
        public String getWheelPrintedPattern() {
            return this.wheelPrintedPattern;
        }
        
        public void setWheelPrintedPattern(String wheelPrintedPattern) {
            this.wheelPrintedPattern = wheelPrintedPattern;
        }
        
        public String getVehicleRoof() {
            return this.vehicleRoof;
        }
        
        public void setVehicleRoof(String vehicleRoof) {
            this.vehicleRoof = vehicleRoof;
        }
        
        public String getPlateNoAttach() {
            return this.plateNoAttach;
        }
        
        public void setPlateNoAttach(String plateNoAttach) {
            this.plateNoAttach = plateNoAttach;
        }
        
        public String getSubImageList() {
            return this.subImageList;
        }
        
        public void setSubImageList(String subImageList) {
            this.subImageList = subImageList;
        }
        
        public String getEventSort() {
            return this.eventSort;
        }
        
        public void setEventSort(String eventSort) {
            this.eventSort = eventSort;
        }
        
        public String getTitle() {
            return this.title;
        }
        
        public void setTitle(String title) {
            this.title = title;
        }
        
        public String getType() {
            return this.type;
        }
        
        public void setType(String type) {
            this.type = type;
        }
        
        public String getDeviceid() {
            return this.deviceid;
        }
        
        public void setDeviceid(String deviceid) {
            this.deviceid = deviceid;
        }
        
        public String getSecurityLevel() {
            return this.securityLevel;
        }
        
        public void setSecurityLevel(String securityLevel) {
            this.securityLevel = securityLevel;
        }
        
        public String getContentDescription() {
            return this.contentDescription;
        }
        
        public void setContentDescription(String contentDescription) {
            this.contentDescription = contentDescription;
        }
        
        public String getFileFormat() {
            return this.fileFormat;
        }
        
        public void setFileFormat(String fileFormat) {
            this.fileFormat = fileFormat;
        }
        
        public String getPlateDescribe() {
            return this.plateDescribe;
        }
        
        public void setPlateDescribe(String plateDescribe) {
            this.plateDescribe = plateDescribe;
        }
        
        public String getTollgateid() {
            return this.tollgateid;
        }
        
        public void setTollgateid(String tollgateid) {
            this.tollgateid = tollgateid;
        }
        
        public String getSideOfVehicle() {
            return this.sideOfVehicle;
        }
        
        public void setSideOfVehicle(String sideOfVehicle) {
            this.sideOfVehicle = sideOfVehicle;
        }
        
        public String getIsSuspicious() {
            return this.isSuspicious;
        }
        
        public void setIsSuspicious(String isSuspicious) {
            this.isSuspicious = isSuspicious;
        }
        
        public String getVehicleFrontItem() {
            return this.vehicleFrontItem;
        }
        
        public void setVehicleFrontItem(String vehicleFrontItem) {
            this.vehicleFrontItem = vehicleFrontItem;
        }
        
        public String getDisappearTime() {
            return this.disappearTime;
        }
        
        public void setDisappearTime(String disappearTime) {
            this.disappearTime = disappearTime;
        }
        
        public String getNameOfPassedRoad() {
            return this.nameOfPassedRoad;
        }
        
        public void setNameOfPassedRoad(String nameOfPassedRoad) {
            this.nameOfPassedRoad = nameOfPassedRoad;
        }
        
        public String getSafetyBelt() {
            return this.safetyBelt;
        }
        
        public void setSafetyBelt(String safetyBelt) {
            this.safetyBelt = safetyBelt;
        }
        
        public String getSpeed() {
            return this.speed;
        }
        
        public void setSpeed(String speed) {
            this.speed = speed;
        }
        
        public String getDescOfFrontItem() {
            return this.descOfFrontItem;
        }
        
        public void setDescOfFrontItem(String descOfFrontItem) {
            this.descOfFrontItem = descOfFrontItem;
        }
        
        public String getVehicleBrand() {
            return this.vehicleBrand;
        }
        
        public void setVehicleBrand(String vehicleBrand) {
            this.vehicleBrand = vehicleBrand;
        }
        
        public String getVehicleShielding() {
            return this.vehicleShielding;
        }
        
        public void setVehicleShielding(String vehicleShielding) {
            this.vehicleShielding = vehicleShielding;
        }
        
        public String getNumOfPassenger() {
            return this.numOfPassenger;
        }
        
        public void setNumOfPassenger(String numOfPassenger) {
            this.numOfPassenger = numOfPassenger;
        }
        
        public String getDescOfRearItem() {
            return this.descOfRearItem;
        }
        
        public void setDescOfRearItem(String descOfRearItem) {
            this.descOfRearItem = descOfRearItem;
        }
        
        public String getVehicleClass() {
            return this.vehicleClass;
        }
        
        public void setVehicleClass(String vehicleClass) {
            this.vehicleClass = vehicleClass;
        }
        
        public String getVehicleModel() {
            return this.vehicleModel;
        }
        
        public void setVehicleModel(String vehicleModel) {
            this.vehicleModel = vehicleModel;
        }
        
        public String getIsDecked() {
            return this.isDecked;
        }
        
        public void setIsDecked(String isDecked) {
            this.isDecked = isDecked;
        }
        
        public String getHitMarkInfo() {
            return this.hitMarkInfo;
        }
        
        public void setHitMarkInfo(String hitMarkInfo) {
            this.hitMarkInfo = hitMarkInfo;
        }
        
        public String getDirection() {
            return this.direction;
        }
        
        public void setDirection(String direction) {
            this.direction = direction;
        }
        
        public String getCarOfVehicle() {
            return this.carOfVehicle;
        }
        
        public void setCarOfVehicle(String carOfVehicle) {
            this.carOfVehicle = carOfVehicle;
        }
        
        public String getSourceid() {
            return this.sourceid;
        }
        
        public void setSourceid(String sourceid) {
            this.sourceid = sourceid;
        }
        
        public String getVehicleColor() {
            return this.vehicleColor;
        }
        
        public void setVehicleColor(String vehicleColor) {
            this.vehicleColor = vehicleColor;
        }
        
        public String getPlateClass() {
            return this.plateClass;
        }
        
        public void setPlateClass(String plateClass) {
            this.plateClass = plateClass;
        }
        
        public String getPlateNo() {
            return this.plateNo;
        }
        
        public void setPlateNo(String plateNo) {
            this.plateNo = plateNo;
        }
        
        public String getRightBtmX() {
            return this.rightBtmX;
        }
        
        public void setRightBtmX(String rightBtmX) {
            this.rightBtmX = rightBtmX;
        }
        
        public String getVehicleBodyDesc() {
            return this.vehicleBodyDesc;
        }
        
        public void setVehicleBodyDesc(String vehicleBodyDesc) {
            this.vehicleBodyDesc = vehicleBodyDesc;
        }
        
        public String getVehicleDoor() {
            return this.vehicleDoor;
        }
        
        public void setVehicleDoor(String vehicleDoor) {
            this.vehicleDoor = vehicleDoor;
        }
        
        public String getRightBtmY() {
            return this.rightBtmY;
        }
        
        public void setRightBtmY(String rightBtmY) {
            this.rightBtmY = rightBtmY;
        }
        
        public String getStorageUrl4() {
            return this.storageUrl4;
        }
        
        public void setStorageUrl4(String storageUrl4) {
            this.storageUrl4 = storageUrl4;
        }
        
        public String getStorageUrl5() {
            return this.storageUrl5;
        }
        
        public void setStorageUrl5(String storageUrl5) {
            this.storageUrl5 = storageUrl5;
        }
        
        public String getSunvisor() {
            return this.sunvisor;
        }
        
        public void setSunvisor(String sunvisor) {
            this.sunvisor = sunvisor;
        }
        
        public String getVehicleLength() {
            return this.vehicleLength;
        }
        
        public void setVehicleLength(String vehicleLength) {
            this.vehicleLength = vehicleLength;
        }
        
        public String getVehicleWidth() {
            return this.vehicleWidth;
        }
        
        public void setVehicleWidth(String vehicleWidth) {
            this.vehicleWidth = vehicleWidth;
        }
        
        public String getInfoKind() {
            return this.infoKind;
        }
        
        public void setInfoKind(String infoKind) {
            this.infoKind = infoKind;
        }
        
        public String getCalling() {
            return this.calling;
        }
        
        public void setCalling(String calling) {
            this.calling = calling;
        }
        
        public String getVehicleHood() {
            return this.vehicleHood;
        }
        
        public void setVehicleHood(String vehicleHood) {
            this.vehicleHood = vehicleHood;
        }
        
        public String getPageNo() {
            return this.pageNo;
        }
        
        public void setPageNo(String pageNo) {
            this.pageNo = pageNo;
        }
        
        public String getPageSize() {
            return this.pageSize;
        }
        
        public void setPageSize(String pageSize) {
            this.pageSize = pageSize;
        }
        
        public String getCountDay() {
            return this.countDay;
        }
        
        public void setCountDay(String countDay) {
            this.countDay = countDay;
        }
        
        public String getCountHour() {
            return this.countHour;
        }
        
        public void setCountHour(String countHour) {
            this.countHour = countHour;
        }
        
        public String getCountMonth() {
            return this.countMonth;
        }
        
        public void setCountMonth(String countMonth) {
            this.countMonth = countMonth;
        }
        
        public String getQyCode() {
            return this.qyCode;
        }
        
        public void setQyCode(String qyCode) {
            this.qyCode = qyCode;
        }
        
        public String getGsCode() {
            return this.gsCode;
        }
        
        public void setGsCode(String gsCode) {
            this.gsCode = gsCode;
        }
    
}