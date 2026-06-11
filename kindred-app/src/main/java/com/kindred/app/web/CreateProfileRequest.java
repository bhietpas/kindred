package com.kindred.app.web;

import java.util.List;

public record CreateProfileRequest(
        String name,
        int age,
        String bio,
        String city,
        List<String> interests,
        boolean availableToHang,
        Double latitude,           // optional — may be null
        Double longitude           // optional — must both be present or both absent
) {}
