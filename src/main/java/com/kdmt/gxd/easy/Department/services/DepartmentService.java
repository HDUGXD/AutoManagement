package com.kdmt.gxd.easy.Department.services;

import com.kdmt.gxd.easy.index.entities.Pageable;
import com.kdmt.gxd.easy.index.entities.Pagination;
import com.kdmt.gxd.easy.Department.entieies.Department;

public interface DepartmentService {
    Pageable findByPager(Pagination<Department> pager, Department condition);
}
