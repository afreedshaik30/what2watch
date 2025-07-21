package com.sb.main.server.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.Map;

import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

@Service
public class ImgBBService {

    @Value("${imgbb.api.key}")
    private String imgbbApiKey;

    public String uploadImage(MultipartFile file) throws IOException {
        String url = "https://api.imgbb.com/1/upload?key=" + imgbbApiKey;
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("image", Base64.getEncoder().encodeToString(file.getBytes()));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        HttpEntity<MultiValueMap<String, Object>> request = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        Map response = restTemplate.postForObject(url, request, Map.class);
        return (String) ((Map) response.get("data")).get("url");
    }
}
