package com.supconit.easy.ticket.book.services.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import com.supconit.easy.ticket.book.daos.BookMapper;
import com.supconit.easy.ticket.book.entieies.Book;
import com.supconit.easy.ticket.book.services.IBookService;
import com.supconit.easy.ticket.util.util.SqlUtil;
import org.springframework.stereotype.Service;



@Service
public class BookService implements IBookService {
    @Resource(name="bookMapper")
    private BookMapper bookMapper;

    @Override
    public boolean save(Book book) {
        return bookMapper.insert(book) > 0;
    }

    @Override
    public boolean update(Book book) {
        return bookMapper.updateByPrimaryKeySelective(book) >= 0;
    }

    @Override
    public boolean delete(Long id) {
        return bookMapper.deleteByPrimaryKey(id) > 0;
    }

    @Override
    public boolean batchDelete(Long[] primaryKeys) {
        return bookMapper.deleteByPrimaryKeys(primaryKeys) > 0;
    }

    @Override
    public Book findModel(Long id) {
        return bookMapper.selectByPrimaryKey(id);
    }

    @Override
    public Book findModel(Long id, String[] parameters) {
        return bookMapper.findModel(id, SqlUtil.formatParameters(parameters));
    }

    public Map<String, Object> findMap(Long id) {
        String[][] parameters = {{"id", "id"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_type", "bookType"}, {"book_author", "bookAuthor"}, {"remark", "remark"}};
        return this.findMap(id, parameters);
    }

    public Map<String, Object> findMap(Long id, String[][] parameters) {
        return bookMapper.findMap(id, SqlUtil.formatParametersForAlias(parameters));
    }

    @Override
    public List<Book> loadModels() {
        return this.loadModels(null, null, null, null, -1, -1);
    }

    @Override
    public List<Book> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return this.loadModels(null, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Book> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return bookMapper.loadModels(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps() {
        String[][] parameters = {{"id", "id"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_type", "bookType"}, {"book_author", "bookAuthor"}, {"remark", "remark"}};
        return this.loadMaps(parameters, null, null, null, null, -1, -1);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit) {
        String[][] parameters = {{"id", "id"}, {"book_name", "bookName"}, {"book_code", "bookCode"}, {"book_type", "bookType"}, {"book_author", "bookAuthor"}, {"remark", "remark"}};
        return this.loadMaps(parameters, condition, values, order, sort, curPage, limit);
    }

    @Override
    public List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit) {
        return bookMapper.loadMaps(SqlUtil.formatParametersForAlias(parameters), SqlUtil.fillCondition(condition, values), order, sort, SqlUtil.getOffset(curPage, limit), limit);
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
        return bookMapper.count(SqlUtil.formatParameters(parameters), SqlUtil.fillCondition(condition, values), isDistinct);
    }

}
