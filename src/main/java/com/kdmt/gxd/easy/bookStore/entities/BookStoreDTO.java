package com.kdmt.gxd.easy.bookStore.entities;

import com.kdmt.gxd.easy.bookStore.entities.BookStore;
import com.kdmt.gxd.easy.util.beanUtil.BeanUtil;

import java.io.Serializable;


public class BookStoreDTO implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
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
        
        public BookStore toModel() {
            BookStore model = new BookStore();
			BeanUtil.convert(this, model);
			return model;
        }
    
}