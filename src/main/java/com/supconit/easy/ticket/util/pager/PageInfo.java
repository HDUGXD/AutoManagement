package com.supconit.easy.ticket.util.pager;

import java.util.List;

/**
 * Created by thinkpad on 2018/5/23.
 */
public class PageInfo {




    public     int  totalCount;//总记录条数

    public    int  totalPage;//总页码

    public    int  pageSize;//页面大小

    public    int  pageNo;//当前第几页

    public List<Object> rows;//返回记录条数

    public    int    startRow;

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalPage() {
        return totalPage;
    }


    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }


    public int getPageSize() {
        if (this.pageSize == 0) {
            this.pageSize = 10;
        }
        return pageSize;
    }


    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }


    public int getPageNo() {
        if (this.pageNo == 0) {
            this.pageNo = 1;
        }
        return pageNo;
    }


    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }


    public List getRows() {
        return rows;
    }


    public void setRows(List rows) {
        this.rows = rows;
    }


    public int getStartRow() {
        return startRow;
    }


    public void setStartRow(int startRow) {
        this.startRow = startRow;
    }


}
