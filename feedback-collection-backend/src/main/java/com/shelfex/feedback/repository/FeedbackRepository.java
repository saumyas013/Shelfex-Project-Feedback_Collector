package com.shelfex.feedback.repository;

import com.shelfex.feedback.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository // Marks this as a Spring Data repository
public interface FeedbackRepository extends MongoRepository<Feedback, String> {
    // Spring Data MongoDB provides CRUD operations automatically
}