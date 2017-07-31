/*Copyright (c) 2016-2017 imaginea.com All Rights Reserved.
 This software is the confidential and proprietary information of imaginea.com You shall not disclose such Confidential Information and shall use it only in accordance
 with the terms of the source code license agreement you entered into with imaginea.com*/
package com.guardian.dublinauth.service;

/*This is a Studio Managed File. DO NOT EDIT THIS FILE. Your changes may be reverted by Studio.*/

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.wavemaker.runtime.data.dao.WMGenericDao;
import com.wavemaker.runtime.data.exception.EntityNotFoundException;
import com.wavemaker.runtime.data.export.ExportType;
import com.wavemaker.runtime.data.expression.QueryFilter;
import com.wavemaker.runtime.data.model.AggregationInfo;
import com.wavemaker.runtime.file.model.Downloadable;

import com.guardian.dublinauth.User;
import com.guardian.dublinauth.UserRoleMapping;


/**
 * ServiceImpl object for domain model class User.
 *
 * @see User
 */
@Service("DublinAuth.UserService")
public class UserServiceImpl implements UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserServiceImpl.class);

    @Autowired
	@Qualifier("DublinAuth.UserRoleMappingService")
	private UserRoleMappingService userRoleMappingService;

    @Autowired
    @Qualifier("DublinAuth.UserDao")
    private WMGenericDao<User, String> wmGenericDao;

    public void setWMGenericDao(WMGenericDao<User, String> wmGenericDao) {
        this.wmGenericDao = wmGenericDao;
    }

    @Transactional(value = "DublinAuthTransactionManager")
    @Override
	public User create(User user) {
        LOGGER.debug("Creating a new User with information: {}", user);
        User userCreated = this.wmGenericDao.create(user);
        if(userCreated.getUserRoleMappings() != null) {
            for(UserRoleMapping userRoleMapping : userCreated.getUserRoleMappings()) {
                userRoleMapping.setUser(userCreated);
                LOGGER.debug("Creating a new child UserRoleMapping with information: {}", userRoleMapping);
                userRoleMappingService.create(userRoleMapping);
            }
        }
        return userCreated;
    }

	@Transactional(readOnly = true, value = "DublinAuthTransactionManager")
	@Override
	public User getById(String userIdInstance) throws EntityNotFoundException {
        LOGGER.debug("Finding User by id: {}", userIdInstance);
        User user = this.wmGenericDao.findById(userIdInstance);
        if (user == null){
            LOGGER.debug("No User found with id: {}", userIdInstance);
            throw new EntityNotFoundException(String.valueOf(userIdInstance));
        }
        return user;
    }

    @Transactional(readOnly = true, value = "DublinAuthTransactionManager")
	@Override
	public User findById(String userIdInstance) {
        LOGGER.debug("Finding User by id: {}", userIdInstance);
        return this.wmGenericDao.findById(userIdInstance);
    }


	@Transactional(rollbackFor = EntityNotFoundException.class, value = "DublinAuthTransactionManager")
	@Override
	public User update(User user) throws EntityNotFoundException {
        LOGGER.debug("Updating User with information: {}", user);
        this.wmGenericDao.update(user);

        String userIdInstance = user.getUserId();

        return this.wmGenericDao.findById(userIdInstance);
    }

    @Transactional(value = "DublinAuthTransactionManager")
	@Override
	public User delete(String userIdInstance) throws EntityNotFoundException {
        LOGGER.debug("Deleting User with id: {}", userIdInstance);
        User deleted = this.wmGenericDao.findById(userIdInstance);
        if (deleted == null) {
            LOGGER.debug("No User found with id: {}", userIdInstance);
            throw new EntityNotFoundException(String.valueOf(userIdInstance));
        }
        this.wmGenericDao.delete(deleted);
        return deleted;
    }

	@Transactional(readOnly = true, value = "DublinAuthTransactionManager")
	@Override
	public Page<User> findAll(QueryFilter[] queryFilters, Pageable pageable) {
        LOGGER.debug("Finding all Users");
        return this.wmGenericDao.search(queryFilters, pageable);
    }

    @Transactional(readOnly = true, value = "DublinAuthTransactionManager")
    @Override
    public Page<User> findAll(String query, Pageable pageable) {
        LOGGER.debug("Finding all Users");
        return this.wmGenericDao.searchByQuery(query, pageable);
    }

    @Transactional(readOnly = true, value = "DublinAuthTransactionManager")
    @Override
    public Downloadable export(ExportType exportType, String query, Pageable pageable) {
        LOGGER.debug("exporting data in the service DublinAuth for table User to {} format", exportType);
        return this.wmGenericDao.export(exportType, query, pageable);
    }

	@Transactional(readOnly = true, value = "DublinAuthTransactionManager")
	@Override
	public long count(String query) {
        return this.wmGenericDao.count(query);
    }

    @Transactional(readOnly = true, value = "DublinAuthTransactionManager")
	@Override
    public Page<Map<String, Object>> getAggregatedValues(AggregationInfo aggregationInfo, Pageable pageable) {
        return this.wmGenericDao.getAggregatedValues(aggregationInfo, pageable);
    }

    @Transactional(readOnly = true, value = "DublinAuthTransactionManager")
    @Override
    public Page<UserRoleMapping> findAssociatedUserRoleMappings(String userId, Pageable pageable) {
        LOGGER.debug("Fetching all associated userRoleMappings");

        StringBuilder queryBuilder = new StringBuilder();
        queryBuilder.append("user.userId = '" + userId + "'");

        return userRoleMappingService.findAll(queryBuilder.toString(), pageable);
    }

    /**
	 * This setter method should only be used by unit tests
	 *
	 * @param service UserRoleMappingService instance
	 */
	protected void setUserRoleMappingService(UserRoleMappingService service) {
        this.userRoleMappingService = service;
    }

}

