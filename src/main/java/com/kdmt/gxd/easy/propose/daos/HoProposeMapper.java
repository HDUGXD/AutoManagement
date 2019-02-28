package com.kdmt.gxd.easy.propose.daos;

import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;

import com.kdmt.gxd.easy.propose.entities.HoPropose;

public interface HoProposeMapper {
    int deleteByPrimaryKey(@Param("id") Long id);

    int deleteByPrimaryKeys(@Param("primaryKeys") Long[] primaryKeys);

    int insert(HoPropose record);

    int insertSelective(HoPropose record);

    HoPropose selectByPrimaryKey(@Param("id") Long id);

    int updateByPrimaryKeySelective(HoPropose record);

    int updateByPrimaryKey(HoPropose record);

    List<HoPropose> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    HoPropose findModel(@Param("id") Long id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") Long id, @Param("parameters") String parameters);
    List<HoPropose> findAllByCondition (HoPropose hoUser);
    //分页
    //分页查询所有数据
//    List<HoUser> findByPage(@Param("pageNo") Long pageNo,@Param("pageSize") Long  pageSize,HoUser condition);
    List<HoPropose> findByPage(HoPropose condition);

    //获得所有记录数
    long getCount();
}
