RM	= @rm -f

NAME = autoCompletion

SRC = main.py

all:
	@cp $(SRC) $(NAME)
	@chmod +x $(NAME)
	@echo "Executable created"

clean:
	@echo "Nothing to clean, it's python"

fclean:
	$(RM) $(NAME)
	@echo "Executable removed"

re: fclean all

.PHONY: all clean fclean re
