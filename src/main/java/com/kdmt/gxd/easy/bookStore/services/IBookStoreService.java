package com.kdmt.gxd.easy.bookStore.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.bookStore.entities.BookStore;

public interface IBookStoreService {
    boolean save(BookStore bookStore);

    boolean update(BookStore bookStore);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    BookStore findModel(Long id);

    BookStore findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<BookStore> loadModels();

    List<BookStore> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<BookStore> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
    List<BookStore> findAllByCondition(BookStore condition);
    List<BookStore> findByPage(BookStore condition);
    long getCount();

}
