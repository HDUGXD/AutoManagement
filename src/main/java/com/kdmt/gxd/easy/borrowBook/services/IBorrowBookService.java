package com.kdmt.gxd.easy.borrowBook.services;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.borrowBook.entities.BorrowBook;

public interface IBorrowBookService {
    boolean save(BorrowBook borrowBook);

    boolean update(BorrowBook borrowBook);

    boolean delete(Long id);

    boolean batchDelete(Long[] primaryKeys);

    BorrowBook findModel(Long id);

    BorrowBook findModel(Long id, String[] parameters);

    Map<String, Object> findMap(Long id);

    Map<String, Object> findMap(Long id, String[][] parameters);

    List<BorrowBook> loadModels();

    List<BorrowBook> loadModels(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<BorrowBook> loadModels(String[] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps();

    List<Map<String, Object>> loadMaps(String condition, Object[] values, String order, String sort, int curPage, int limit);

    List<Map<String, Object>> loadMaps(String[][] parameters, String condition, Object[] values, String order, String sort, int curPage, int limit);

    long count();
    long getCount();
    List<BorrowBook> findAllByCondition(BorrowBook condition);
    List<BorrowBook> findByPage(BorrowBook condition);

    long count(String condition, Object[] values);

    long count(String[] parameters, boolean isDistinct);

    long count(String[] parameters, String condition, Object[] values, boolean isDistinct);
}
