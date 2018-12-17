package com.kdmt.gxd.easy.Department.daos.impl;

import com.kdmt.gxd.easy.Department.daos.DepartmentDao;
import com.kdmt.gxd.easy.Department.entieies.Department;
import com.kdmt.gxd.easy.index.entities.Pageable;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class DepartmentDaoImpl implements DepartmentDao {

    @Autowired
    private SqlSession sqlSession;

    private final String NAMESPACE  = "Department";

    @Override
    public Pageable<Department> findByPager(Pageable<Department> pager, Department condition) {
        return findByPager(pager,"selectPager","countPager",condition,null);
    }
    protected <X> Pageable<X> findByPager(Pageable<X> pager, String selectStatement, String countStatement, X condition, Map<String, Object> otherParams) {
        HashMap params = new HashMap();
        params.put("offset", Integer.valueOf(pager.getOffset()));
        params.put("pageSize", Integer.valueOf(pager.getPageSize()));
        params.put("offsetEnd", Integer.valueOf(pager.getOffsetEnd()));
        params.put("condition", condition);
        if(!CollectionUtils.isEmpty(otherParams)) {
            params.putAll(otherParams);
        }

        List result = sqlSession.selectList(NAMESPACE + "." + selectStatement, params);
        pager.addAll(result);
        long total = this.calculateTotal(pager, result);
        if(total < 0L) {
            total = ((Long)sqlSession.selectOne(NAMESPACE + "." + countStatement, params)).longValue();
        }

        pager.setTotal(total);
        return pager;
    }

    protected <X> long calculateTotal(Pageable<X> pager, List<X> result) {
        return pager.hasPrevPage()?(CollectionUtils.isEmpty(result)?-1L:(result.size() == pager.getPageSize()?-1L:(long)((pager.getPageNo() - 1) * pager.getPageSize() + result.size()))):(result.size() < pager.getPageSize()?(long)result.size():-1L);
    }
}
