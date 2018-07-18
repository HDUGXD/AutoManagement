package com.supconit.easy.ticket.Department.services;

import com.supconit.easy.ticket.Department.entieies.Department;
import com.supconit.easy.ticket.index.entities.Pageable;
import com.supconit.easy.ticket.index.entities.Pagination;

public interface DepartmentService {
    Pageable findByPager(Pagination<Department> pager, Department condition);
}
