package com.gustavobarez.link_shortener.entity;

public record LinkResponseDTO(String originalUrl, String shortUrl, String publicId, String password) {

    public LinkResponseDTO(Link link) {
        this(link.getOriginalUrl(), link.getShortUrl(), link.getPublicId(), link.getPassword());
    }

}
