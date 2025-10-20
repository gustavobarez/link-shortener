package com.gustavobarez.link_shortener.entity;

public record LinkResponseDTO(String originalUrl, String shortUrl) {
    
    public LinkResponseDTO(Link link) {
        this(link.getOriginalUrl(), link.getShortUrl());
    }

}
