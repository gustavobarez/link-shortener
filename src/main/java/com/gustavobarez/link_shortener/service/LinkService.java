package com.gustavobarez.link_shortener.service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gustavobarez.link_shortener.entity.Link;
import com.gustavobarez.link_shortener.entity.LinkRequestDTO;
import com.gustavobarez.link_shortener.entity.LinkResponseDTO;
import com.gustavobarez.link_shortener.repository.LinkRepository;

@Service
public class LinkService {

    private final LinkRepository repository;

    public LinkService(LinkRepository repository) {
        this.repository = repository;
    }

    public LinkResponseDTO createShorterUrl(LinkRequestDTO linkRequestDTO) {
        String originalUrl = linkRequestDTO.url();

        Optional<Link> existingLink = repository.findByOriginalUrl(originalUrl);
        if (existingLink.isPresent()) {
            return new LinkResponseDTO(existingLink.get());
        }

        String shortUrl;
        do {
            shortUrl = shortUrl(originalUrl);
        } while (repository.findByShortUrl(shortUrl).isPresent());

        Link link = Link.builder()
                .originalUrl(originalUrl)
                .shortUrl(shortUrl)
                .createdAt(LocalDateTime.now())
                .build();

        repository.save(link);

        return new LinkResponseDTO(link);
    }

    public String shortUrl(String originalUrl) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(originalUrl.getBytes(StandardCharsets.UTF_8));

            String encoded = Base64.getUrlEncoder().withoutPadding().encodeToString(hash);

            return encoded.substring(0, 6);

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }

}
