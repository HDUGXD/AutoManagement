package com.kdmt.gxd.easy.webservice;

import javax.activation.DataHandler;
import javax.jws.WebService;
import java.rmi.RemoteException;

/**
 * Created by thinkpad on 2018/12/12.
 */
@WebService(serviceName = "wbUserService" ,endpointInterface = "com.kdmt.gxd.easy.webservice.TracklogSender")
public class GEForMcuImpl implements TracklogSender{
    @Override
    public String initTrans(String agencyId, String agencyKey) throws RemoteException {
        return null;
    }

    @Override
    public String closeTrans(String agencyId, String agencyKey) throws RemoteException {
        return null;
    }

    @Override
    public String writeTracklogData(String deviceId, String agencyId, String agencyKey, String passportName, String directionName, String wayId, String wayName, String passtime, String plateNumber, String plateColor, String plateType, String carType, String carLogo, String carModel, String carColor, String carLength, String firstPicPath, String secondPicPath, String reservePicPath, String speed, String maxLimitSpeed, String minLimitSpeed, String littleArea, DataHandler firstPic, DataHandler secondPic, DataHandler reservePic, String carNoConfide, String carRect, String bz1, String bz2) throws RemoteException {
        System.out.println("test");
        return null;
    }
}
