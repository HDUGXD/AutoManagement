package com.kdmt.gxd.easy.bookStore.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.kdmt.gxd.easy.util.beanUtil.SqlUtil;
import org.springframework.stereotype.Service;

import com.kdmt.gxd.easy.bookStore.daos.BookStoreMapper;
import com.kdmt.gxd.easy.bookStore.services.IBookStoreService;
import com.kdmt.gxd.easy.bookStore.entities.BookStore;

@Service
public class BookStoreService implements IBookStoreService {
    @Resource(name="bookStoreMapper")
    private BookStoreMapper bookStoreMapper;

    @Override
    public boolean save(BookStore bookStore) {
        return bookStoreMapper.insert(bookStore) > 0;
    }

    @Override
    public boolean update(BookStore bookStore) {
        return bookStoreMapper.updateByPrimaryKeySelective(bookStore) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return bookStoreMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return bookStoreMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public BookStore findModel(Long id) {
        return bookStoreMapper.selectByPrimaryKey(id);
    }

    @Override
    public BookStore findModel(Long id, String[] parameters) {
        return bookStoreMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"store_name", "storeName"}, {"store_code", "storeCode"}, {"store_type", "storeType"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_author", "bookAuthor"}, {"book_publish", "bookPublish"}, {"book_type", "bookType"}, {"book_left_num", "bookLeftNum"}, {"book_pic_url", "bookPicUrl"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return bookStoreMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<BookStore> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<BookStore> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<BookStore> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return bookStoreMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"store_name", "storeName"}, {"store_code", "storeCode"}, {"store_type", "storeType"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_author", "bookAuthor"}, {"book_publish", "bookPublish"}, {"book_type", "bookType"}, {"book_left_num", "bookLeftNum"}, {"book_pic_url", "bookPicUrl"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"store_name", "storeName"}, {"store_code", "storeCode"}, {"store_type", "storeType"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_author", "bookAuthor"}, {"book_publish", "bookPublish"}, {"book_type", "bookType"}, {"book_left_num", "bookLeftNum"}, {"book_pic_url", "bookPicUrl"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return bookStoreMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return bookStoreMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }
    @Override
    public List<BookStore> findByPage(BookStore condition) {
        return bookStoreMapper.findByPage(condition);
    }
    @Override
    public long getCount() {
        return bookStoreMapper.getCount();
    }
    @Override
    public List<BookStore> findAllByCondition(BookStore condition) {
        return bookStoreMapper.findAllByCondition(condition);
    }

}
