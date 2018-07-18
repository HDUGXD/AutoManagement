package com.supconit.easy.ticket.Department.daos;

import com.supconit.easy.ticket.Department.entieies.Department;
import com.supconit.easy.ticket.index.entities.Pageable;

public interface DepartmentDao {

    Pageable<Department> findByPager(Pageable<Department> pager, Department condition);

}
