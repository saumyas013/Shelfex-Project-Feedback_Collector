//package com.shelfex.feedback.service;
//
//import com.shelfex.feedback.dto.FeedbackRequest;
//import com.shelfex.feedback.model.Feedback;
//import com.shelfex.feedback.repository.FeedbackRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//
//@Service // Marks this as a Spring service component
//public class FeedbackService {
//
//    @Autowired // Injects the FeedbackRepository instance
//    private FeedbackRepository feedbackRepository;
//
//    public Feedback submitFeedback(FeedbackRequest feedbackRequest) {
//        Feedback feedback = new Feedback();
//        feedback.setName(feedbackRequest.getName());
//        feedback.setEmail(feedbackRequest.getEmail());
//        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
//        feedback.setRating(feedbackRequest.getRating());
//
//        // For simplicity, let's set a default product ID if not provided, or handle it as per requirement
//        // For a multi-product system, this would come from the frontend
//        feedback.setProductId(feedbackRequest.getProductId() != null ? feedbackRequest.getProductId() : "general_product");
//
//        feedback.setCreatedAt(LocalDateTime.now()); // Set current timestamp
//
//        return feedbackRepository.save(feedback); // Save to MongoDB
//    }
//}




//package com.shelfex.feedback.service;
//
//import com.shelfex.feedback.dto.FeedbackRequest;
//import com.shelfex.feedback.model.Feedback;
//import com.shelfex.feedback.repository.FeedbackRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//
//@Service // Marks this as a Spring service component
//public class FeedbackService {
//
//    @Autowired // Injects the FeedbackRepository instance
//    private FeedbackRepository feedbackRepository;
//
//    public Feedback submitFeedback(FeedbackRequest feedbackRequest) {
//        Feedback feedback = new Feedback();
//        feedback.setName(feedbackRequest.getName());
//        feedback.setEmail(feedbackRequest.getEmail());
//        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
//        feedback.setRating(feedbackRequest.getRating());
//
//        // For simplicity, let's set a default product ID if not provided, or handle it as per requirement
//        // For a multi-product system, this would come from the frontend
//        feedback.setProductId(feedbackRequest.getProductId() != null ? feedbackRequest.getProductId() : "general_product");
//
//        feedback.setCreatedAt(LocalDateTime.now()); // Set current timestamp
//
//        return feedbackRepository.save(feedback); // Save to MongoDB
//    }
//}
//
//

//package com.shelfex.feedback.service;
//
//import com.shelfex.feedback.dto.FeedbackRequest;
//import com.shelfex.feedback.model.Feedback;
//import com.shelfex.feedback.repository.FeedbackRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.aggregation.Aggregation;
//import org.springframework.data.mongodb.core.aggregation.AggregationResults;
//import org.springframework.data.mongodb.core.aggregation.GroupOperation;
//import org.springframework.data.mongodb.core.aggregation.MatchOperation;
//import org.springframework.data.mongodb.core.aggregation.SortOperation; // Corrected: Import SortOperation
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional; // Keep Optional import as it's good practice for other scenarios
//
//import static org.springframework.data.mongodb.core.aggregation.Aggregation.*; // Import static methods
//
//@Service
//public class FeedbackService {
//
//    @Autowired
//    private FeedbackRepository feedbackRepository;
//
//    @Autowired
//    private MongoTemplate mongoTemplate; // Used for more complex aggregation queries
//
//    public Feedback submitFeedback(FeedbackRequest feedbackRequest) {
//        Feedback feedback = new Feedback();
//        feedback.setName(feedbackRequest.getName());
//        feedback.setEmail(feedbackRequest.getEmail());
//        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
//        feedback.setRating(feedbackRequest.getRating()); // Will accept null now
//
//        feedback.setProductId(feedbackRequest.getProductId() != null ? feedbackRequest.getProductId() : "general_product_v1");
//
//        feedback.setCreatedAt(LocalDateTime.now());
//
//        return feedbackRepository.save(feedback);
//    }
//
//    public List<Feedback> getAllFeedback(String productId, Integer rating, String sortBy, String sortOrder) {
//        Query query = new Query();
//
//        // Apply filters
//        if (productId != null && !productId.isEmpty()) {
//            query.addCriteria(Criteria.where("productId").is(productId));
//        }
//        // This filter will work for specific rating values, and will be ignored if 'rating' is null
//        if (rating != null) {
//            query.addCriteria(Criteria.where("rating").is(rating));
//        }
//
//        // Apply sorting
//        Sort.Direction direction = Sort.Direction.ASC;
//        if ("desc".equalsIgnoreCase(sortOrder)) {
//            direction = Sort.Direction.DESC;
//        }
//
//        String actualSortBy = "createdAt"; // Default sort
//        if (sortBy != null && !sortBy.isEmpty()) {
//            if (sortBy.equalsIgnoreCase("rating")) {
//                actualSortBy = "rating";
//            } else if (sortBy.equalsIgnoreCase("createdAt")) {
//                actualSortBy = "createdAt";
//            }
//        }
//        query.with(Sort.by(direction, actualSortBy));
//
//        return mongoTemplate.find(query, Feedback.class);
//    }
//
//    public Map<String, Object> getFeedbackStats() {
//        Map<String, Object> stats = new HashMap<>();
//
//        // 1. Total records
//        long totalRecords = feedbackRepository.count();
//        stats.put("totalRecords", totalRecords);
//
//        // Define a match operation to filter out documents where rating is null or doesn't exist
//        // This ensures calculations for average rating and distribution only consider valid ratings (1-5)
//        MatchOperation matchRatings = Aggregation.match(Criteria.where("rating").exists(true).and("rating").ne(null));
//
//        // 2. Average Rating
//        GroupOperation groupByNull = Aggregation.group() // Corrected: Use Aggregation.group()
//                .avg("rating").as("averageRating");
//        // Corrected: Pass matchRatings to newAggregation to filter data before grouping
//        Aggregation aggregationAvg = newAggregation(matchRatings, groupByNull);
//        AggregationResults<Map> averageRatingResult = mongoTemplate.aggregate(aggregationAvg, "feedbacks", Map.class);
//
//        // Corrected: Handling the return of getUniqueMappedResult()
//        // If it returns Optional<Map> (Spring Boot 3.x+ default):
////        Optional<Map> avgMapOptional = averageRatingResult.getUniqueMappedResult();
////        stats.put("averageRating", avgMapOptional.map(m -> m.get("averageRating")).orElse(0.0));
//
//        // If your specific Spring Data MongoDB version returns Map directly (less common for recent versions):
//        // Map avgMap = averageRatingResult.getUniqueMappedResult();
//        // stats.put("averageRating", (avgMap != null && avgMap.containsKey("averageRating")) ? avgMap.get("averageRating") : 0.0);
//        // Uncomment the above two lines and comment out the Optional lines if you still get the error after rebuilding.
//
//
//        // 3. Rating Distribution (Count of 1-star, 2-star, etc.)
//        GroupOperation groupByRating = Aggregation.group("rating") // Corrected: Use Aggregation.group()
//                .count().as("count");
//        SortOperation sortByRating = Aggregation.sort(Sort.Direction.ASC, "_id"); // Corrected: Use Aggregation.sort()
//        // Corrected: Pass matchRatings to newAggregation to filter data before grouping
//        Aggregation aggregationDistribution = newAggregation(matchRatings, groupByRating, sortByRating);
//        AggregationResults<Map> distributionResult = mongoTemplate.aggregate(aggregationDistribution, "feedbacks", Map.class);
//
//        Map<String, Long> ratingDistribution = new HashMap<>();
//        // Initialize all ratings to 0 to ensure they are present in the response
//        for (int i = 1; i <= 5; i++) {
//            ratingDistribution.put(String.valueOf(i), 0L);
//        }
//        distributionResult.getMappedResults().forEach(entry -> {
//            // Ensure _id is not null before processing (it should not be if matchRatings is used)
//            if (entry.get("_id") != null) {
//                String ratingKey = String.valueOf(entry.get("_id"));
//                Long countValue = ((Number) entry.get("count")).longValue();
//                ratingDistribution.put(ratingKey, countValue);
//            }
//        });
//        stats.put("ratingDistribution", ratingDistribution);
//
//        // 4. Feedback Count per Product
//        GroupOperation groupByCategory = Aggregation.group("productId") // Corrected: Use Aggregation.group()
//                .count().as("feedbackCount")
//                .avg("rating").as("averageRating"); // Also get avg rating per product
//        SortOperation sortByCountDesc = Aggregation.sort(Sort.Direction.DESC, "feedbackCount"); // Corrected: Use Aggregation.sort()
//        Aggregation aggregationProductCounts = newAggregation(groupByCategory, sortByCountDesc); // Corrected: Pass operations
//        AggregationResults<Map> productCountsResult = mongoTemplate.aggregate(aggregationProductCounts, "feedbacks", Map.class);
//        stats.put("feedbackPerProduct", productCountsResult.getMappedResults());
//
//        return stats;
//    }
//}




//package com.shelfex.feedback.service;
//
//import com.shelfex.feedback.dto.FeedbackRequest;
//import com.shelfex.feedback.model.Feedback;
//import com.shelfex.feedback.repository.FeedbackRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Sort;
//import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.aggregation.Aggregation;
//import org.springframework.data.mongodb.core.aggregation.AggregationResults;
//import org.springframework.data.mongodb.core.aggregation.GroupOperation;
//import org.springframework.data.mongodb.core.aggregation.MatchOperation;
//import org.springframework.data.mongodb.core.aggregation.SortOperation;
//import org.springframework.data.mongodb.core.query.Criteria;
//import org.springframework.data.mongodb.core.query.Query;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//import java.util.Optional; // Keep this import
//
//import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;
//
//@Service
//public class FeedbackService {
//
//    @Autowired
//    private FeedbackRepository feedbackRepository;
//
//    @Autowired
//    private MongoTemplate mongoTemplate;
//
//    public Feedback submitFeedback(FeedbackRequest feedbackRequest) {
//        Feedback feedback = new Feedback();
//        feedback.setName(feedbackRequest.getName());
//        feedback.setEmail(feedbackRequest.getEmail());
//        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
//        feedback.setRating(feedbackRequest.getRating()); // Now expects a non-null rating from frontend
//
//        feedback.setProductId(feedbackRequest.getProductId() != null ? feedbackRequest.getProductId() : "general_product_v1");
//
//        feedback.setCreatedAt(LocalDateTime.now());
//
//        return feedbackRepository.save(feedback);
//    }
//
//    public List<Feedback> getAllFeedback(String productId, Integer rating, String sortBy, String sortOrder) {
//        Query query = new Query();
//
//        if (productId != null && !productId.isEmpty()) {
//            query.addCriteria(Criteria.where("productId").is(productId));
//        }
//        // This filter will now specifically look for feedback with a certain rating
//        if (rating != null) {
//            query.addCriteria(Criteria.where("rating").is(rating));
//        }
//
//        Sort.Direction direction = Sort.Direction.ASC;
//        if ("desc".equalsIgnoreCase(sortOrder)) {
//            direction = Sort.Direction.DESC;
//        }
//
//        String actualSortBy = "createdAt";
//        if (sortBy != null && !sortBy.isEmpty()) {
//            if (sortBy.equalsIgnoreCase("rating")) {
//                actualSortBy = "rating";
//            } else if (sortBy.equalsIgnoreCase("createdAt")) {
//                actualSortBy = "createdAt";
//            }
//        }
//        query.with(Sort.by(direction, actualSortBy));
//
//        return mongoTemplate.find(query, Feedback.class);
//    }
//
//    public Optional<Map<String, Object>> getFeedbackStats() {
//        Map<String, Object> stats = new HashMap<>();
//
//        long totalRecords = feedbackRepository.count();
//        stats.put("totalRecords", totalRecords);
//
//        MatchOperation matchRatings = Aggregation.match(
//                Criteria.where("rating").exists(true).and("rating").ne(null)
//        );
//
//        GroupOperation groupByNull = Aggregation.group()
//                .avg("rating").as("averageRating");
//        Aggregation aggregationAvg = newAggregation(matchRatings, groupByNull);
//        AggregationResults<Map> averageRatingResult = mongoTemplate.aggregate(aggregationAvg, "feedbacks", Map.class);
//
//        Optional<Map> avgMapOptional = averageRatingResult.getUniqueMappedResult();
//        stats.put("averageRating", avgMapOptional.map(m -> m.get("averageRating")).orElse(0.0));
//
//        GroupOperation groupByRating = Aggregation.group("rating")
//                .count().as("count");
//        SortOperation sortByRating = Aggregation.sort(Sort.Direction.ASC, "_id");
//        Aggregation aggregationDistribution = newAggregation(matchRatings, groupByRating, sortByRating);
//        AggregationResults<Map> distributionResult = mongoTemplate.aggregate(aggregationDistribution, "feedbacks", Map.class);
//
//        Map<String, Long> ratingDistribution = new HashMap<>();
//        for (int i = 1; i <= 5; i++) {
//            ratingDistribution.put(String.valueOf(i), 0L);
//        }
//        distributionResult.getMappedResults().forEach(entry -> {
//            if (entry.get("_id") != null) {
//                String ratingKey = String.valueOf(entry.get("_id"));
//                Long countValue = ((Number) entry.get("count")).longValue();
//                ratingDistribution.put(ratingKey, countValue);
//            }
//        });
//        stats.put("ratingDistribution", ratingDistribution);
//
//        GroupOperation groupByCategory = Aggregation.group("productId")
//                .count().as("feedbackCount")
//                .avg("rating").as("averageRating");
//        SortOperation sortByCountDesc = Aggregation.sort(Sort.Direction.DESC, "feedbackCount");
//        Aggregation aggregationProductCounts = newAggregation(groupByCategory, sortByCountDesc);
//        AggregationResults<Map> productCountsResult = mongoTemplate.aggregate(aggregationProductCounts, "feedbacks", Map.class);
//        stats.put("feedbackPerProduct", productCountsResult.getMappedResults());
//
//        return Optional.of(stats);
//    }
//
//}




package com.shelfex.feedback.service;

import com.shelfex.feedback.dto.FeedbackRequest;
import com.shelfex.feedback.model.Feedback;
import com.shelfex.feedback.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

import static org.springframework.data.mongodb.core.aggregation.Aggregation.*;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Feedback submitFeedback(FeedbackRequest feedbackRequest) {
        Feedback feedback = new Feedback();
        feedback.setName(feedbackRequest.getName());
        feedback.setEmail(feedbackRequest.getEmail());
        feedback.setFeedbackText(feedbackRequest.getFeedbackText());
        feedback.setRating(feedbackRequest.getRating()); // can be null

        feedback.setProductId(
                Optional.ofNullable(feedbackRequest.getProductId())
                        .orElse("general_product_v1")
        );
        feedback.setCreatedAt(LocalDateTime.now());

        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback(String productId, Integer rating, String sortBy, String sortOrder) {
        Query query = new Query();

        if (productId != null && !productId.isEmpty()) {
            query.addCriteria(Criteria.where("productId").is(productId));
        }
        if (rating != null) {
            query.addCriteria(Criteria.where("rating").is(rating));
        }

        String actualSortBy = "createdAt";
        if ("rating".equalsIgnoreCase(sortBy)) {
            actualSortBy = "rating";
        }

        Sort.Direction direction = "desc".equalsIgnoreCase(sortOrder) ? Sort.Direction.DESC : Sort.Direction.ASC;
        query.with(Sort.by(direction, actualSortBy));

        return mongoTemplate.find(query, Feedback.class);
    }

    public Optional<Map<String, Object>> getFeedbackStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalRecords = feedbackRepository.count();
        stats.put("totalRecords", totalRecords);

        // Filter to exclude null ratings
        MatchOperation matchRatings = match(Criteria.where("rating").ne(null));

        // Average rating
        GroupOperation groupByNull = group().avg("rating").as("averageRating");
        Aggregation aggregationAvg = newAggregation(matchRatings, groupByNull);
        AggregationResults<Map> avgResult = mongoTemplate.aggregate(aggregationAvg, "feedbacks", Map.class);
        Map avgMap = avgResult.getUniqueMappedResult();

        stats.put("averageRating", avgMap != null && avgMap.get("averageRating") != null
                ? avgMap.get("averageRating") : 0.0);

        // Rating distribution (1–5)
        GroupOperation groupByRating = group("rating").count().as("count");
        SortOperation sortByRating = sort(Sort.Direction.ASC, "_id");
        Aggregation aggregationDistribution = newAggregation(matchRatings, groupByRating, sortByRating);
        AggregationResults<Map> distributionResult = mongoTemplate.aggregate(aggregationDistribution, "feedbacks", Map.class);

        Map<String, Long> ratingDistribution = new HashMap<>();
        for (int i = 1; i <= 5; i++) {
            ratingDistribution.put(String.valueOf(i), 0L);
        }

        distributionResult.getMappedResults().forEach(entry -> {
            if (entry.get("_id") != null && entry.get("count") != null) {
                String key = entry.get("_id").toString();
                Long value = ((Number) entry.get("count")).longValue();
                ratingDistribution.put(key, value);
            }
        });
        stats.put("ratingDistribution", ratingDistribution);

        // Feedback per product
        GroupOperation groupByProduct = group("productId")
                .count().as("feedbackCount")
                .avg("rating").as("averageRating");
        SortOperation sortByFeedbackCount = sort(Sort.Direction.DESC, "feedbackCount");
        Aggregation productAgg = newAggregation(groupByProduct, sortByFeedbackCount);
        AggregationResults<Map> productStats = mongoTemplate.aggregate(productAgg, "feedbacks", Map.class);

        stats.put("feedbackPerProduct", productStats.getMappedResults());

        return stats.isEmpty() ? Optional.empty() : Optional.of(stats);
    }
}
