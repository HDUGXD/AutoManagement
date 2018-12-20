package com.kdmt.gxd.easy.bayonet.entities;

import java.util.Date;
import java.io.Serializable;


public class Bayonet implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        
        private String deviceId;
        
        private String agencyId;
        
        private String agencyKey;
        
        private String passportName;
        
        private String directionName;
        
        private String wayId;
        
        private String wayName;
        
        private Date passtime;
        
        private String plateNumber;
        
        private String plateColor;
        
        private String plateType;
        
        private String carType;
        
        private String carLogo;
        
        private String carModel;
        
        private String carColor;
        
        private String carLength;
        
        private String firstPicPath;
        
        private String secondPicPath;
        
        private String reservePicPath;
        
        private String speed;
        
        private String maxLimitSpeed;
        
        private String minLimitSpeed;
        
        private String littleArea;
        
        private String firstPic;
        
        private String secondPic;
        
        private String reservePic;
        
        private String carNoConfide;
        
        private String carRect;
        
        private String bz1;
        
        private String bz2;
        
        private Integer pageNo;
        
        private Integer pageSize;
        
        private String countDay;
        
        private String countHour;
        
        private String countMonth;
        
        private String qyCode;
        
        private String gsCode;

        private String start;

        private String end;

        private String jgsjCn;

    public String getJgsjCn() {
        return jgsjCn;
    }

    public void setJgsjCn(String jgsjCn) {
        this.jgsjCn = jgsjCn;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getEnd() {
        return end;
    }

    public void setEnd(String end) {
        this.end = end;
    }

    public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getDeviceId() {
            return this.deviceId;
        }
        
        public void setDeviceId(String deviceId) {
            this.deviceId = deviceId;
        }
        
        public String getAgencyId() {
            return this.agencyId;
        }
        
        public void setAgencyId(String agencyId) {
            this.agencyId = agencyId;
        }
        
        public String getAgencyKey() {
            return this.agencyKey;
        }
        
        public void setAgencyKey(String agencyKey) {
            this.agencyKey = agencyKey;
        }
        
        public String getPassportName() {
            return this.passportName;
        }
        
        public void setPassportName(String passportName) {
            this.passportName = passportName;
        }
        
        public String getDirectionName() {
            return this.directionName;
        }
        
        public void setDirectionName(String directionName) {
            this.directionName = directionName;
        }
        
        public String getWayId() {
            return this.wayId;
        }
        
        public void setWayId(String wayId) {
            this.wayId = wayId;
        }
        
        public String getWayName() {
            return this.wayName;
        }
        
        public void setWayName(String wayName) {
            this.wayName = wayName;
        }
        
        public Date getPasstime() {
            return this.passtime;
        }
        
        public void setPasstime(Date passtime) {
            this.passtime = passtime;
        }
        
        public String getPlateNumber() {
            return this.plateNumber;
        }
        
        public void setPlateNumber(String plateNumber) {
            this.plateNumber = plateNumber;
        }
        
        public String getPlateColor() {
            return this.plateColor;
        }
        
        public void setPlateColor(String plateColor) {
            this.plateColor = plateColor;
        }
        
        public String getPlateType() {
            return this.plateType;
        }
        
        public void setPlateType(String plateType) {
            this.plateType = plateType;
        }
        
        public String getCarType() {
            return this.carType;
        }
        
        public void setCarType(String carType) {
            this.carType = carType;
        }
        
        public String getCarLogo() {
            return this.carLogo;
        }
        
        public void setCarLogo(String carLogo) {
            this.carLogo = carLogo;
        }
        
        public String getCarModel() {
            return this.carModel;
        }
        
        public void setCarModel(String carModel) {
            this.carModel = carModel;
        }
        
        public String getCarColor() {
            return this.carColor;
        }
        
        public void setCarColor(String carColor) {
            this.carColor = carColor;
        }
        
        public String getCarLength() {
            return this.carLength;
        }
        
        public void setCarLength(String carLength) {
            this.carLength = carLength;
        }
        
        public String getFirstPicPath() {
            return this.firstPicPath;
        }
        
        public void setFirstPicPath(String firstPicPath) {
            this.firstPicPath = firstPicPath;
        }
        
        public String getSecondPicPath() {
            return this.secondPicPath;
        }
        
        public void setSecondPicPath(String secondPicPath) {
            this.secondPicPath = secondPicPath;
        }
        
        public String getReservePicPath() {
            return this.reservePicPath;
        }
        
        public void setReservePicPath(String reservePicPath) {
            this.reservePicPath = reservePicPath;
        }
        
        public String getSpeed() {
            return this.speed;
        }
        
        public void setSpeed(String speed) {
            this.speed = speed;
        }
        
        public String getMaxLimitSpeed() {
            return this.maxLimitSpeed;
        }
        
        public void setMaxLimitSpeed(String maxLimitSpeed) {
            this.maxLimitSpeed = maxLimitSpeed;
        }
        
        public String getMinLimitSpeed() {
            return this.minLimitSpeed;
        }
        
        public void setMinLimitSpeed(String minLimitSpeed) {
            this.minLimitSpeed = minLimitSpeed;
        }
        
        public String getLittleArea() {
            return this.littleArea;
        }
        
        public void setLittleArea(String littleArea) {
            this.littleArea = littleArea;
        }
        
        public String getFirstPic() {
            return this.firstPic;
        }
        
        public void setFirstPic(String firstPic) {
            this.firstPic = firstPic;
        }
        
        public String getSecondPic() {
            return this.secondPic;
        }
        
        public void setSecondPic(String secondPic) {
            this.secondPic = secondPic;
        }
        
        public String getReservePic() {
            return this.reservePic;
        }
        
        public void setReservePic(String reservePic) {
            this.reservePic = reservePic;
        }
        
        public String getCarNoConfide() {
            return this.carNoConfide;
        }
        
        public void setCarNoConfide(String carNoConfide) {
            this.carNoConfide = carNoConfide;
        }
        
        public String getCarRect() {
            return this.carRect;
        }
        
        public void setCarRect(String carRect) {
            this.carRect = carRect;
        }
        
        public String getBz1() {
            return this.bz1;
        }
        
        public void setBz1(String bz1) {
            this.bz1 = bz1;
        }
        
        public String getBz2() {
            return this.bz2;
        }
        
        public void setBz2(String bz2) {
            this.bz2 = bz2;
        }
        
        public Integer getPageNo() {
            return this.pageNo;
        }
        
        public void setPageNo(Integer pageNo) {
            this.pageNo = pageNo;
        }
        
        public Integer getPageSize() {
            return this.pageSize;
        }
        
        public void setPageSize(Integer pageSize) {
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