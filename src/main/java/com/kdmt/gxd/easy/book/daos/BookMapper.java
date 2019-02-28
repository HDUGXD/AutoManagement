package com.kdmt.gxd.easy.book.daos;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.book.entities.Book;
import org.apache.ibatis.annotations.Param;


public interface BookMapper {
    int deleteByPrimaryKey(@Param("id") Long id);

    int deleteByPrimaryKeys(@Param("primaryKeys") Long[] primaryKeys);

    int insert(Book record);

    int insertSelective(Book record);

    Book selectByPrimaryKey(@Param("id") Long id);

    int updateByPrimaryKeySelective(Book record);

    int updateByPrimaryKey(Book record);

    List<Book> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    Book findModel(@Param("id") Long id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") Long id, @Param("parameters") String parameters);
    List<Book> findAllByCondition (Book hoUser);
    //分页
    //分页查询所有数据
//    List<HoUser> findByPage(@Param("pageNo") Long pageNo,@Param("pageSize") Long  pageSize,HoUser condition);
    List<Book> findByPage(Book condition);

    //获得所有记录数
    long getCount();
}
