package com.kdmt.gxd.easy.Department.daos;

import com.kdmt.gxd.easy.index.entities.Pageable;
import com.kdmt.gxd.easy.Department.entieies.Department;

public interface DepartmentDao {

    Pageable<Department> findByPager(Pageable<Department> pager, Department condition);

}
