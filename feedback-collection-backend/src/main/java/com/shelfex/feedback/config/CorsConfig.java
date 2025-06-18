// feedback-collection-backend/src/main/java/com/example/feedback/config/CorsConfig.java
package com.shelfex.feedback.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Apply to all /api endpoints
                .allowedOrigins(
                        "http://localhost:3000", // For local development testing
                        "https://shelfex-project-feedback-collector.vercel.app" // <-- IMPORTANT: PLACEHOLDER FOR NOW! You'll update this later.
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}