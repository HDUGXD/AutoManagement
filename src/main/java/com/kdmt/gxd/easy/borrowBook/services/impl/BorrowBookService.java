package com.kdmt.gxd.easy.borrowBook.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.util.beanUtil.SqlUtil;
import org.springframework.stereotype.Service;

import com.kdmt.gxd.easy.borrowBook.entities.BorrowBook;
import com.kdmt.gxd.easy.borrowBook.daos.BorrowBookMapper;
import com.kdmt.gxd.easy.borrowBook.services.IBorrowBookService;

@Service
public class BorrowBookService implements IBorrowBookService {
    @Resource(name="borrowBookMapper")
    private BorrowBookMapper borrowBookMapper;

    @Override
    public boolean save(BorrowBook borrowBook) {
        return borrowBookMapper.insert(borrowBook) > 0;
    }

    @Override
    public boolean update(BorrowBook borrowBook) {
        return borrowBookMapper.updateByPrimaryKeySelective(borrowBook) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return borrowBookMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return borrowBookMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public BorrowBook findModel(Long id) {
        return borrowBookMapper.selectByPrimaryKey(id);
    }

    @Override
    public BorrowBook findModel(Long id, String[] parameters) {
        return borrowBookMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_type", "bookType"}, {"book_author", "bookAuthor"}, {"book_publish", "bookPublish"}, {"borrow_status", "borrowStatus"}, {"book_left_num", "bookLeftNum"}, {"book_pic_url", "bookPicUrl"}, {"remark", "remark"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return borrowBookMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<BorrowBook> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<BorrowBook> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<BorrowBook> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return borrowBookMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_type", "bookType"}, {"book_author", "bookAuthor"}, {"book_publish", "bookPublish"}, {"borrow_status", "borrowStatus"}, {"book_left_num", "bookLeftNum"}, {"book_pic_url", "bookPicUrl"}, {"remark", "remark"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_type", "bookType"}, {"book_author", "bookAuthor"}, {"book_publish", "bookPublish"}, {"borrow_status", "borrowStatus"}, {"book_left_num", "bookLeftNum"}, {"book_pic_url", "bookPicUrl"}, {"remark", "remark"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return borrowBookMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public long count() {
        return this.count(null, false);
    }

    @Override
    public long count(String condition, Object[] values) {
        return this.count(null, condition, values, false);
    }

    @Override
    public long count(String[] parameters, boolean isDistinct) {
        return this.count(parameters, null, null, isDistinct);
    }

    @Override
    public long count(String[] parameters, String condition, Object[] values, boolean isDistinct) {
        return borrowBookMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }
    @Override
    public List<BorrowBook> findByPage(BorrowBook condition) {
        return borrowBookMapper.findByPage(condition);
    }
    @Override
    public long getCount() {
        return borrowBookMapper.getCount();
    }
    @Override
    public List<BorrowBook> findAllByCondition(BorrowBook condition) {
        return borrowBookMapper.findAllByCondition(condition);
    }


}
