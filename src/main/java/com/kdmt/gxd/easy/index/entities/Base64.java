package com.kdmt.gxd.easy.index.entities;

import java.io.UnsupportedEncodingException;
/**
 * 来源 http://blog.csdn.net/coolmasoft/article/details/2913634
 */
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class Base64 {
	// 加密
	@SuppressWarnings("restriction")
	public static String getBase64(String str) {
		byte[] b = null;
		String s = null;
		try {
			b = str.getBytes("utf-8");
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if (b != null) {
			s = new BASE64Encoder().encode(b);
		}
		return s;
	}

	// 解密
	@SuppressWarnings("restriction")
	public static String getFromBase64(String s) {
		byte[] b = null;
		String result = null;
		if (s != null) {
			@SuppressWarnings("restriction")
			BASE64Decoder decoder = new BASE64Decoder();
			try {
				b = decoder.decodeBuffer(s);
				result = new String(b, "utf-8");
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return result;
	}

	public static void main(String[] args) {
		String result = getBase64("L3hzZ2FuYmdsL215RGV2aWNlcy9nZXJlblppY2hhbg==");
		System.out.println(result);
		result = getFromBase64("L3hzZ2FuYmdsL215RGV2aWNlcy9nZXJlblppY2hhbg==");
		System.out.println(result);
	}
}
