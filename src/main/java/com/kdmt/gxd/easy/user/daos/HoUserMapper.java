package com.kdmt.gxd.easy.user.daos;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.user.entities.HoUser;
import org.apache.ibatis.annotations.Param;


public interface HoUserMapper {
    int deleteByPrimaryKey(@Param("id") Long id);

    int deleteByPrimaryKeys(@Param("primaryKeys") Long[] primaryKeys);

    int insert(HoUser record);

    int insertSelective(HoUser record);

    HoUser selectByPrimaryKey(@Param("id") Long id);

    int updateByPrimaryKeySelective(HoUser record);

    int updateByPrimaryKey(HoUser record);

    List<HoUser> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    HoUser findModel(@Param("id") Long id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") Long id, @Param("parameters") String parameters);

    List<HoUser> findAllByCondition (HoUser hoUser);
    //分页
    //分页查询所有数据
//    List<HoUser> findByPage(@Param("pageNo") Long pageNo,@Param("pageSize") Long  pageSize,HoUser condition);
        List<HoUser> findByPage(HoUser condition);

    //获得所有记录数
    long getCount();
}
