package com.gustavobarez.link_shortener.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gustavobarez.link_shortener.entity.LinkDeleteRequestDTO;
import com.gustavobarez.link_shortener.entity.LinkRequestDTO;
import com.gustavobarez.link_shortener.entity.LinkResponseDTO;
import com.gustavobarez.link_shortener.service.LinkService;

@RestController
@RequestMapping("/api/v1/url")
public class LinkController {

    private final LinkService service;

    public LinkController(LinkService service) {
        this.service = service;
    }

    @PostMapping
    public LinkResponseDTO createShorterUrl(@RequestBody LinkRequestDTO dto) {
        return service.createShorterUrl(dto);
    }

    @GetMapping("/{shortUrl}")
    public ResponseEntity<Object> redirect(@PathVariable String shortUrl) {
        var shortedUrl = service.redirect(shortUrl);
        return shortedUrl.map(link -> ResponseEntity.status(HttpStatus.FOUND)
                .header("Location", link.getOriginalUrl())
                .build())
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping
    public void deleteShorterUrl(@RequestBody LinkDeleteRequestDTO request) {
        service.deleteShorterUrl(request);
    }

}
