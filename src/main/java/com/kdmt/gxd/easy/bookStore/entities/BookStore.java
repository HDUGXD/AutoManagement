package com.kdmt.gxd.easy.bookStore.entities;

import java.io.Serializable;


public class BookStore implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        
        private String storeName;
        
        private String storeCode;
        
        private String storeType;
        
        private String bookName;
        
        private String bookCode;
        
        private String bookAuthor;
        
        private String bookPublish;
        
        private String bookType;
        
        private Integer bookLeftNum;
        
        private String bookPicUrl;

        private String imgName;



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

    public String getImgName() {
        return imgName;
    }

    public void setImgName(String imgName) {
        this.imgName = imgName;
    }

    public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getStoreName() {
            return this.storeName;
        }
        
        public void setStoreName(String storeName) {
            this.storeName = storeName;
        }
        
        public String getStoreCode() {
            return this.storeCode;
        }
        
        public void setStoreCode(String storeCode) {
            this.storeCode = storeCode;
        }
        
        public String getStoreType() {
            return this.storeType;
        }
        
        public void setStoreType(String storeType) {
            this.storeType = storeType;
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
        
        public String getBookType() {
            return this.bookType;
        }
        
        public void setBookType(String bookType) {
            this.bookType = bookType;
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
    
}