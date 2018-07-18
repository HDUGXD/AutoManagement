package com.supconit.easy.ticket.index.entities;

import java.util.List;

public interface Pageable<T> extends List<T> {

	int		DEFAULT_PAGE_NO		= 1;
	int		DEFAULT_PAGE_SIZE	= 20;
	long	DEFAULT_TOTAL		= 0;
	int		MAX_PAGE_SIZE		= 1000;

	void setTotal(long total);

	void setPageNo(int pageNo);

	void setPageSize(int pageSize);

	int getPageNo();

	int getPageSize();

	long getTotal();

	int getTotalPage();

	boolean hasPrevPage();

	boolean hasNextPage();

	int getFirstPage();

	int getLastPage();

	int getPrevPage();

	int getNextPage();

	int getOffset();

	int getOffsetEnd();
}