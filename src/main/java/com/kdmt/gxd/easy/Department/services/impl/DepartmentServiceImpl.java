package com.kdmt.gxd.easy.Department.services.impl;

import com.kdmt.gxd.easy.index.entities.Pagination;
import com.kdmt.gxd.easy.Department.daos.DepartmentDao;
import com.kdmt.gxd.easy.Department.entieies.Department;
import com.kdmt.gxd.easy.Department.services.DepartmentService;
import com.kdmt.gxd.easy.index.entities.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
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
