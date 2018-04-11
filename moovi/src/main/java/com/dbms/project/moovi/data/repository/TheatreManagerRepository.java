package com.dbms.project.moovi.data.repository;

import com.dbms.project.moovi.data.entity.TheatreManager;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface TheatreManagerRepository extends CrudRepository<TheatreManager, Long> {

    @Query("SELECT t FROM TheatreManager t WHERE t.username=:username")
    TheatreManager findManagerByUsername(@Param("username") String u);
}