package com.supconit.easy.ticket.Department.services.impl;

import com.supconit.easy.ticket.Department.daos.DepartmentDao;
import com.supconit.easy.ticket.Department.entieies.Department;
import com.supconit.easy.ticket.Department.services.DepartmentService;
import com.supconit.easy.ticket.index.entities.Pageable;
import com.supconit.easy.ticket.index.entities.Pagination;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import java.io.Serializable;


@Service
public class DepartmentServiceImpl implements DepartmentService,Serializable {

    @Autowired
    private DepartmentDao departmentDao;

    @Override
    public Pageable findByPager(Pagination<Department> pager, Department condition) {

        departmentDao.findByPager(pager,condition);

        return pager;
    }


}
