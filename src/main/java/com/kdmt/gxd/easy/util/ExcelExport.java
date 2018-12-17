package com.kdmt.gxd.easy.util;


import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.DatatypeConverter;
import java.io.IOException;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by yangtianyi@supcon.com on 2015-9-14.
 */
public class ExcelExport {

    public static void convert(String fileName, String base64, String contentType, HttpServletResponse response) throws IOException {
        response.setHeader("Content-Disposition", "attachment;filename=" + fileName);

        response.setContentType(contentType);

        byte[] data = DatatypeConverter.parseBase64Binary(base64);

        response.setContentLength(data.length);
        response.getOutputStream().write(data);
    }
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.FIELD)
    public @interface ExcelAnnotation {
        // excel导出时标题显示的名字，如果没有设置Annotation属性，将不会被导出和导入
        public String exportName();
        //此属性为判断过滤字段
        public String status()default "0";
    }

}
