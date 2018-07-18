package com.supconit.easy.ticket.index.entities;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.serializer.SimpleDateFormatSerializer;

public class Pagination<T> extends ArrayList<T> implements Pageable<T> {

	private static final long		serialVersionUID	= -5403359437615228683L;

	public int					pageNo				= DEFAULT_PAGE_NO;
	public int					pageSize			= DEFAULT_PAGE_SIZE;
	public long					total				= DEFAULT_TOTAL;


	@SuppressWarnings({ "rawtypes" })
	private static final Pagination	EMPTY				= new Pagination();

	@SuppressWarnings("unchecked")
	public static <X> Pagination<X> empty() {
		return EMPTY;
	}

	/**
	 * 
	 */
	public Pagination() {
		super();
	}

	/**
	 * @param c
	 */
	public Pagination(Collection<? extends T> c) {
		super(c);
	}

	/**
	 * @param pageNo
	 */
	public Pagination(int pageNo) {
		this(pageNo, DEFAULT_PAGE_SIZE);
	}

	/**
	 * @param pageNo
	 * @param pageSize
	 */
	public Pagination(int pageNo, int pageSize) {
		super();
		setPageNo(pageNo);
		setPageSize(pageSize);
	}

	/**
	 * @param pageNo
	 * @param pageSize
	 */
	public Pagination(Collection<? extends T> c, long total, int pageNo, int pageSize) {
		this(c);
		setTotal(total);
		setPageNo(pageNo);
		setPageSize(pageSize);
	}

	/*
	 * @see hc.base.domains.PageBean#getTotalPages()
	 */
	@Override
	public int getTotalPage() {
		if (this.total <= 0) return 0;
		int n = (int) (this.total / this.pageSize);
		if (this.total % this.pageSize == 0) return n;
		return n + 1;
	}

	/*
	 * @see hc.base.domains.PageBean#hasPrevPage()
	 */
	@Override
	public boolean hasPrevPage() {
		return this.pageNo > DEFAULT_PAGE_NO;
	}

	/*
	 * @see hc.base.domains.PageBean#hasNextPage()
	 */
	@Override
	public boolean hasNextPage() {
		return this.pageNo < getTotalPage();
	}

	/*
	 * @see hc.base.domains.PageBean#getFirstPage()
	 */
	@Override
	public int getFirstPage() {
		return DEFAULT_PAGE_NO;
	}

	/*
	 * @see hc.base.domains.PageBean#getLastPage()
	 */
	@Override
	public int getLastPage() {
		return getTotalPage();
	}

	/*
	 * @see hc.base.domains.PageBean#getPrevPage()
	 */
	@Override
	public int getPrevPage() {
		if (hasPrevPage()) return (this.pageNo - 1);
		return DEFAULT_PAGE_NO;
	}

	/*
	 * @see hc.base.domains.PageBean#getNextPage()
	 */
	@Override
	public int getNextPage() {
		if (hasNextPage()) return (this.pageNo + 1);
		return getTotalPage();
	}

	/*
	 * @see hc.base.domains.PageBean#getPageNo()
	 */
	@Override
	public int getPageNo() {
		return this.pageNo;
	}

	/*
	 * @see hc.base.domains.PageBean#getPageSize()
	 */
	@Override
	public int getPageSize() {
		return this.pageSize;
	}

	/*
	 * @see hc.base.domains.PageBean#getTotal()
	 */
	@Override
	public long getTotal() {
		return this.total;
	}

	/**
	 * @param pageNo
	 *            the pageNo to set
	 */
	public void setPageNo(int pageNo) {
		if (pageNo < DEFAULT_PAGE_NO) pageNo = DEFAULT_PAGE_NO;
		else this.pageNo = pageNo;
	}

	/**
	 * @param pageSize
	 *            the pageSize to set
	 */
	public void setPageSize(int pageSize) {
		if (pageSize < 1) this.pageSize = DEFAULT_PAGE_SIZE;
		else this.pageSize = pageSize;
	}

	/**
	 * @param total
	 *            the total to set
	 */
	public void setTotal(long total) {
		this.total = total;
	}

	/*
	 * @see hc.base.domains.PageBean#getOffset()
	 */
	@Override
	public int getOffset() {
		return (this.pageNo - 1) * this.pageSize;
	}

	/*
	 * @see hc.base.domains.PageBean#getOffsetEnd()
	 */
	@Override
	public int getOffsetEnd() {
		return getOffset() + getPageSize();
	}

	private static SerializeConfig		mapping		= new SerializeConfig();
	private static SerializerFeature[]	features	= new SerializerFeature[] { SerializerFeature.DisableCircularReferenceDetect };
	static {
		mapping.put(java.sql.Date.class, new SimpleDateFormatSerializer("yyyy-MM-dd"));
		mapping.put(java.sql.Timestamp.class, new SimpleDateFormatSerializer("yyyy-MM-dd HH:mm:ss"));
		mapping.put(java.sql.Time.class, new SimpleDateFormatSerializer("HH:mm:ss"));
		mapping.put(Date.class, new SimpleDateFormatSerializer("yyyy-MM-dd HH:mm:ss"));
	}

	public String toJson() {
		String list = JSON.toJSONString(this, mapping, features);
		StringBuilder builder = new StringBuilder("{");
		builder.append("\"rows\":").append(list);
		builder.append(",\"pageSize\":").append(getPageSize());
		builder.append(",\"pageNo\":").append(getPageNo());
		builder.append(",\"total\":").append(getTotal());
		builder.append(",\"totalPage\":").append(getTotalPage());
		builder.append("}");
		return builder.toString();
	}

}