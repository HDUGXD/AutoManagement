package com.kdmt.gxd.easy.util.util;


/**
 *
 * 限制条数的DTO
 * */
public class LimitShowDTO {

    private int curPage = 1;
    // 限制默认为-1，如果为-1不需要限制

    private int limit = -1;

    public int getCurPage() {
        return curPage;
    }

    public void setCurPage(int curPage) {
        this.curPage = curPage;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    /**
     * 计算开始
     * */
    public int calculateStart() {
        return limit < 0 ? -1 : (curPage - 1) * limit;
    }

    /**
     * 计算结束
     * */
    public int calculateEnd() {
        return limit < 0 ? -1 : curPage * limit;
    }

}
