package com.kdmt.gxd.easy.propose.entities;

import java.io.Serializable;


public class HoPropose implements Serializable {
        
        private static final long serialVersionUID = 1L;
        
        private Long id;
        
        private String proposeName;
        
        private String proposeCode;
        
        private String statuCode;
        
        private String startPerson;
        
        private String startTime;
        
        private String remark;
        
        public Long getId() {
            return this.id;
        }
        
        public void setId(Long id) {
            this.id = id;
        }
        
        public String getProposeName() {
            return this.proposeName;
        }
        
        public void setProposeName(String proposeName) {
            this.proposeName = proposeName;
        }
        
        public String getProposeCode() {
            return this.proposeCode;
        }
        
        public void setProposeCode(String proposeCode) {
            this.proposeCode = proposeCode;
        }
        
        public String getStatuCode() {
            return this.statuCode;
        }
        
        public void setStatuCode(String statuCode) {
            this.statuCode = statuCode;
        }
        
        public String getStartPerson() {
            return this.startPerson;
        }
        
        public void setStartPerson(String startPerson) {
            this.startPerson = startPerson;
        }
        
        public String getStartTime() {
            return this.startTime;
        }
        
        public void setStartTime(String startTime) {
            this.startTime = startTime;
        }
        
        public String getRemark() {
            return this.remark;
        }
        
        public void setRemark(String remark) {
            this.remark = remark;
        }
    
}