package com.kdmt.gxd.easy.webservice;

import javax.activation.DataHandler;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;

/**
 * Created by thinkpad on 2018/12/12.
 */
@WebService
@SOAPBinding(style = SOAPBinding.Style.DOCUMENT)
public interface TracklogSender {
    public java.lang.String initTrans(@WebParam(name="agencyId")String agencyId, @WebParam(name="agencyKey")String agencyKey) throws java.rmi.RemoteException;
    public java.lang.String closeTrans(@WebParam(name="agencyId")String agencyId, @WebParam(name="agencyKey")String agencyKey) throws java.rmi.RemoteException;
    public String writeTracklogData(@WebParam(name="deviceId")String deviceId, @WebParam(name="agencyId")String agencyId, @WebParam(name="agencyKey")String agencyKey, @WebParam(name="passportName")String passportName, @WebParam(name="directionName")String directionName, @WebParam(name="wayId")String wayId, @WebParam(name="wayName")String wayName, @WebParam(name="passtime")String passtime, @WebParam(name="plateNumber")String plateNumber, @WebParam(name="plateColor")String plateColor, @WebParam(name="plateType")String plateType, @WebParam(name="carType")String carType, @WebParam(name="carLogo")String carLogo, @WebParam(name="carModel")String carModel, @WebParam(name="carColor")String carColor, @WebParam(name="carLength")String carLength, @WebParam(name="firstPicPath")String firstPicPath, @WebParam(name="secondPicPath")String secondPicPath, @WebParam(name="reservePicPath")String reservePicPath, @WebParam(name="speed")String speed, @WebParam(name="maxLimitSpeed")String maxLimitSpeed, @WebParam(name="minLimitSpeed")String minLimitSpeed, @WebParam(name="littleArea")String littleArea, @WebParam(name="firstPic")DataHandler firstPic, @WebParam(name="secondPic")DataHandler  secondPic, @WebParam(name="reservePic") DataHandler  reservePic, @WebParam(name="carNoConfide")String carNoConfide, @WebParam(name="carRect")String carRect, @WebParam(name="bz1")String bz1, @WebParam(name="bz2")String bz2) throws java.rmi.RemoteException;

}
