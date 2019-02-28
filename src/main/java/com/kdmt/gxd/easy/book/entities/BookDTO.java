package com.kdmt.gxd.easy.book.entities;


import com.kdmt.gxd.easy.util.util.BeanUtil;

import java.io.Serializable;


public class BookDTO implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private String bookName;
        
        private String bookCode;
        
        private String bookType;
        
        private String bookAuthor;
        
        private String bookPublish;
        
        private String borrowStatus;
        
        private String bookLeftNum;
        
        private String bookPicUrl;
        
        private String remark;
        
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
        
        public String getBookLeftNum() {
            return this.bookLeftNum;
        }
        
        public void setBookLeftNum(String bookLeftNum) {
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
        
        public Book toModel() {
            Book model = new Book();
			BeanUtil.convert(this, model);
			return model;
        }
    
}