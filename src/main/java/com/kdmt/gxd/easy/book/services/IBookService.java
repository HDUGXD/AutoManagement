package com.kdmt.gxd.easy.book.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.book.entities.Book;

public interface IBookService {
    boolean save(Book book);

    boolean update(Book book);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    Book findModel(Long id);

    Book findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<Book> loadModels();

    List<Book> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Book> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    List<Book> findAllByCondition(Book condition);
    List<Book> findByPage(Book condition);
    long getCount();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
