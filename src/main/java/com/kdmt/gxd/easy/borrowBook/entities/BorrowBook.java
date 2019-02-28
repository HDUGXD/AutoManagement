package com.kdmt.gxd.easy.borrowBook.entities;

import java.io.Serializable;


public class BorrowBook implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        
        private String bookName;
        
        private String bookCode;
        
        private String bookType;
        
        private String bookAuthor;
        
        private String bookPublish;
        
        private String borrowStatus;
        
        private Integer bookLeftNum;
        
        private String bookPicUrl;
        
        private String remark;

    //******分页属性-自定义********
    private int  pageNo;
    private int  pageSize;

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getBookName() {
            return this.bookName;
        }
        
        public void setBookName(String bookName) {
            this.bookName = bookName;
        }
        
        public String getBookCode() {
            return this.bookCode;
        }
        
        public void setBookCode(String bookCode) {
            this.bookCode = bookCode;
        }
        
        public String getBookType() {
            return this.bookType;
        }
        
        public void setBookType(String bookType) {
            this.bookType = bookType;
        }
        
        public String getBookAuthor() {
            return this.bookAuthor;
        }
        
        public void setBookAuthor(String bookAuthor) {
            this.bookAuthor = bookAuthor;
        }
        
        public String getBookPublish() {
            return this.bookPublish;
        }
        
        public void setBookPublish(String bookPublish) {
            this.bookPublish = bookPublish;
        }
        
        public String getBorrowStatus() {
            return this.borrowStatus;
        }
        
        public void setBorrowStatus(String borrowStatus) {
            this.borrowStatus = borrowStatus;
        }
        
        public Integer getBookLeftNum() {
            return this.bookLeftNum;
        }
        
        public void setBookLeftNum(Integer bookLeftNum) {
            this.bookLeftNum = bookLeftNum;
        }
        
        public String getBookPicUrl() {
            return this.bookPicUrl;
        }
        
        public void setBookPicUrl(String bookPicUrl) {
            this.bookPicUrl = bookPicUrl;
        }
        
        public String getRemark() {
            return this.remark;
        }
        
        public void setRemark(String remark) {
            this.remark = remark;
        }
    
}