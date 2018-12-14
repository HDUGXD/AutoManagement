package com.supconit.easy.ticket.book.entieies;


import com.supconit.easy.ticket.util.util.BeanUtil;

import java.io.Serializable;


public class BookDTO implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private String bookName;
        
        private String bookCode;
        
        private String bookType;
        
        private String bookAuthor;
        
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