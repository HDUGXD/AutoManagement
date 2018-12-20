package com.kdmt.gxd.easy.bayonet.daos;

import java.util.List;
import java.util.Map;

import com.kdmt.gxd.easy.bayonet.entities.Bayonet;
import org.apache.ibatis.annotations.Param;


public interface BayonetMapper {
    int deleteByPrimaryKey(@Param("id") Long id);

    int deleteByPrimaryKeys(@Param("primaryKeys") Long[] primaryKeys);

    int insert(Bayonet record);

    int insertSelective(Bayonet record);

    Bayonet selectByPrimaryKey(@Param("id") Long id);

    int updateByPrimaryKeySelective(Bayonet record);

    int updateByPrimaryKey(Bayonet record);

    List<Bayonet> loadModels(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    List<Map<String, Object>> loadMaps(@Param("parameters") String parameters, @Param("condition") String condition, @Param("order") String order, @Param("sort") String sort, @Param("offset") int offset, @Param("limit") int limit);

    long count(@Param("parameters") String parameters, @Param("condition") String condition, @Param("isDistinct") boolean isDistinct);

    Bayonet findModel(@Param("id") Long id, @Param("parameters") String parameters);

    Map<String, Object> findMap(@Param("id") Long id, @Param("parameters") String parameters);
    List<Bayonet> findAllByCondition(Bayonet hoUser);
    List<Bayonet> findByPage(Bayonet condition);
    //获得所有记录数
    long getCount();
    List<Bayonet> getEcharts_1(Bayonet record);
    List<Bayonet> getEcharts_2(Bayonet record);
    List<Bayonet> getEcharts_3(Bayonet record);
    List<Bayonet> getEcharts_4(Bayonet record);
    List<Bayonet> getEcharts_5(Bayonet record);
    List<Bayonet> getEcharts_6(Bayonet record);
}
