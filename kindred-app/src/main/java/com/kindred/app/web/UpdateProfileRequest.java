package com.kindred.app.web;

import java.util.List;

public record UpdateProfileRequest(
        String name,
        int age,
        String bio,
        String city,
        List<String> interests,
        boolean availableToHang,
        Double latitude,           // optional
        Double longitude           // optional
) {}
