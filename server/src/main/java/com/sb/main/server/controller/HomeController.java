package com.sb.main.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/api")
    public String welcome(){
        return "WELCOME 2 W2W";
    }
}
