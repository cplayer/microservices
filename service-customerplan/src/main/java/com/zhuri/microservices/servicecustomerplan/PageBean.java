package com.zhuri.microservices.servicecustomerplan;

import java.util.List;

public class PageBean<T> {
    // 当前页
    private Integer pageNumber = 1;
    // 每页显示的总条数
    private Integer pageSize = 10;
    // 总条数
    private Integer total;
    // 是否有下一页
    private Integer isMore;
    // 总页数
    private Integer totalPage;
    // 开始索引
    private Integer startIndex;
    // 分页结果
    private List<T> rows;

    public PageBean() {
        super();
    }

    public PageBean(Integer pageNumber, Integer pageSize, Integer total) {
        super();
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.total = total;
        this.totalPage = (this.total+this.pageSize-1)/this.pageSize;
        this.startIndex = (this.pageNumber-1)*this.pageSize;
        this.isMore = this.pageNumber >= this.totalPage?0:1;
    }

    public Integer getPageNumber() {
        return pageNumber;
     }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getTotal() {
        return total;
     }

    public void setTotal(Integer total) {
        this.total = total;
    }

    public Integer getIsMore() {
        return isMore;
    }

    public void setIsMore(Integer isMore) {
        this.isMore = isMore;
    }

    public Integer getTotalPage() {
        return totalPage;
    }

     public void setTotalPage(Integer totalPage) {
        this.totalPage = totalPage;
     }

     public Integer getStartIndex() {
         return startIndex;
     }

     public void setStartIndex(Integer startIndex) {
         this.startIndex = startIndex;
     }

     public List<T> getRows() {
         return rows;
    }

     public void setRows(List<T> rows) {
         this.rows = rows;
     }
}
